import { kv } from '@vercel/kv';

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
    const locationData = await ipinfoResponse.json();
    
    // Create visitor data object
    const visitorData = {
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

    // Store in KV
    const visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    await kv.set(visitorId, visitorData);
    await kv.lpush('all_visitors', visitorId);
    
    // Keep only last 500 visitors
    await kv.ltrim('all_visitors', 0, 499);
    
    console.log('Visitor tracked:', visitorData);
    
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