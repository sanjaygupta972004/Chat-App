import GoogleStrategy from 'passport-google-oauth20';    
import passport from 'passport';
const strategy = GoogleStrategy.Strategy;

passport.use(
   new strategy(
         {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile']
         },
         (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
         }

   )
)

passport.serializeUser((user, done) => {
   done(null, user);
});

passport.deserializeUser((user, done) => {
   done(null, user);
});