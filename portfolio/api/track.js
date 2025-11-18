export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress;
    
    const IPINFO_TOKEN = process.env.IPINFO_API_TOKEN;
    
    if (!IPINFO_TOKEN) {
      console.error('IPinfo API token not found');
      return res.status(500).json({ error: 'Configuration error' });
    }

    const ipinfoResponse = await fetch(`https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`);
    const locationData = await ipinfoResponse.json();
    
    const visitorData = {
      id: `visitor_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ip,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
      location: {
        city: locationData.city || 'Unknown',
        country: locationData.country || 'Unknown',
        region: locationData.region || 'Unknown'
      },
      page: '/'
    };

    // Since Edge Config is read-only, we'll store in a simple JSON format
    // You'll need to manually update the Edge Config with visitor data
    console.log('=== VISITOR DATA TO ADD TO EDGE CONFIG ===');
    console.log(JSON.stringify(visitorData, null, 2));
    console.log('==========================================');
    
    res.status(200).json({ 
      success: true,
      message: 'Visitor logged - check function logs'
    });

  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}