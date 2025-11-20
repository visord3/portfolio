export default async function handler(req, res) {
  const password = req.query.password || req.headers.authorization;
  
  // NO PASSWORD CHECK - this is for debugging only
  res.json({
    message: "Debug endpoint working",
    receivedPassword: password,
    expectedPassword: process.env.ADMIN_PASSWORD,
    passwordsMatch: password === process.env.ADMIN_PASSWORD,
    hasEnvVar: !!process.env.ADMIN_PASSWORD,
    expectedPasswordLength: process.env.ADMIN_PASSWORD?.length,
    receivedPasswordLength: password?.length,
    allEnvVars: Object.keys(process.env).filter(key => key.includes('ADMIN')),
    url: req.url,
    query: req.query
  });
}