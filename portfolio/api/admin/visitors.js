import { get } from '@vercel/edge-config';

export default async function handler(req, res) {
  const password = req.query.password || req.headers.authorization;
  
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const action = req.query.action || 'list';

    if (action === 'test') {
      // Test Edge Config connection
      try {
        // Check if EDGE_CONFIG exists
        if (!process.env.EDGE_CONFIG) {
          return res.status(500).json({
            error: 'Edge Config not configured',
            details: 'EDGE_CONFIG environment variable missing'
          });
        }

        const visitors = await get('visitors');
        res.json({
          success: true,
          message: 'Edge Config connected successfully',
          hasVisitors: !!visitors,
          visitorCount: visitors ? visitors.length : 0,
          edgeConfigConnected: true
        });
      } catch (error) {
        res.status(500).json({
          error: 'Edge Config connection failed',
          details: error.message,
          hasEdgeConfig: !!process.env.EDGE_CONFIG
        });
      }
    }
    else if (action === 'list') {
      const visitors = await get('visitors') || [];
      res.json({
        total: visitors.length,
        visitors: visitors.slice(0, 50)
      });
    } 
    else if (action === 'stats') {
      const visitors = await get('visitors') || [];
      
      const countryStats = {};
      visitors.forEach(visitor => {
        const country = visitor.location?.country || visitor.country || 'Unknown';
        countryStats[country] = (countryStats[country] || 0) + 1;
      });

      res.json({
        totalVisitors: visitors.length,
        countryStats,
        recentVisitors: visitors.slice(-10)
      });
    }
    else {
      res.status(400).json({ error: 'Invalid action. Use: list, stats, or test' });
    }
  } catch (error) {
    console.error('Admin error:', error);
    res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
}