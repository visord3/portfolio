export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get visitor's IP address
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress;
    
    // Get IPinfo API token from environment variables
    const IPINFO_TOKEN = process.env.IPINFO_API_TOKEN;
    
    if (!IPINFO_TOKEN) {
      console.error('IPinfo API token not found');
      return res.status(500).json({ error: 'Configuration error' });
    }

    // Fetch location data from IPinfo
    const ipinfoResponse = await fetch(`https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`);
    
    if (!ipinfoResponse.ok) {
      throw new Error(`IPinfo API error: ${ipinfoResponse.status}`);
    }
    
    const locationData = await ipinfoResponse.json();
    
    // Create visitor data object
    const visitorData = {
      ip,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer || 'Direct',
      location: {
        city: locationData.city || 'Unknown',
        region: locationData.region || 'Unknown',
        country: locationData.country || 'Unknown',
        coordinates: locationData.loc || null,
        timezone: locationData.timezone || null,
        org: locationData.org || null
      },
      page: req.body.page || '/',
      sessionId: req.body.sessionId || null
    };

    // Log visitor data (you can replace this with database storage)
    console.log('Visitor tracked:', JSON.stringify(visitorData, null, 2));
    
    // Optional: Store in a database here
    // await storeVisitorData(visitorData);
    
    // Return success response (don't expose sensitive data)
    res.status(200).json({ 
      success: true, 
      message: 'Visit tracked',
      country: locationData.country,
      city: locationData.city 
    });

  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}