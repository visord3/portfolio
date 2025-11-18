import { get } from '@vercel/edge-config';

export default async function handler(req, res) {
  const password = req.query.password || req.headers.authorization;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const action = req.query.action || 'list';

    if (action === 'list') {
      // Get visitors from Edge Config
      const visitors = await get('visitors') || [];
      
      res.json({
        total: visitors.length,
        visitors: visitors.slice(0, 50) // Show last 50
      });
    } 
    else if (action === 'stats') {
      // Get statistics from Edge Config
      const visitors = await get('visitors') || [];
      
      // Count by country
      const countryStats = {};
      visitors.forEach(visitor => {
        const country = visitor.location?.country || 'Unknown';
        countryStats[country] = (countryStats[country] || 0) + 1;
      });

      res.json({
        totalVisitors: visitors.length,
        countryStats,
        recentVisitors: visitors.slice(-10)
      });
    }
    else if (action === 'test') {
      // Test Edge Config connection
      try {
        const visitors = await get('visitors');
        res.json({
          success: true,
          message: 'Edge Config connected',
          hasVisitors: !!visitors,
          visitorCount: visitors ? visitors.length : 0
        });
      } catch (error) {
        res.status(500).json({
          error: 'Edge Config test failed',
          details: error.message
        });
      }
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