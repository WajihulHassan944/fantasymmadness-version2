const Sitemap = require('react-router-sitemap').default;
const path = require('path');

// Define your static routes manually
const routes = [
  '/', // Home
  '/HowToPlay',
  '/Sponsors',
  '/CreateAccount',
  '/AffiliateCreateAccount',
  '/dynamopromoimg',
  '/community-forum',
  '/create-thread',
  '/past-fights',
  '/our-fighters',
  '/faqs',
  '/forum-rules',
  '/about',
  '/thank-you',
  '/login',
  '/profile',
  '/UserDashboard',
  '/trashed-fights',
  '/guides',
  '/affiliate-guides',
  '/myLeagueRecords',
  '/leaderboard',
  '/YourFights',
  '/PlayForFree',
  '/upcomingfights',
  '/fightLeaderboard',
  '/FinishedFight',
  '/privacy-policy',
  '/terms-of-service',
  '/administration/login',
  '/contact',
  '/transaction',
  '/AffiliateDashboard',
  '/HowItWorks',
  '/AffiliateProfile',
  '/AffiliatePromotion',
  '/administration/upcomingFights',
  '/administration/predictions',
  '/administration/AddNewMatch',
  '/administration/PreviousMatches',
  '/administration/DeleteUpdateMatches',
  '/administration',
  '/administration/RegisteredUsers',
  '/administration/AffiliateUsers',
  '/administration/ShadowFightsLibrary',
  '/administration/YoutubeArchive',
  '/administration/adminRecords',
  '/administration/payouts',
  '/administration/non-registered-users',
  '/administration/Community',
  '/administration/suspended-accounts',
  '/administration/podcasts',
  '/administration/AffiliateMatches',
  '/administration/Calendar',
  '/administration/Email',
];

// Define the output file path for the sitemap
const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');

// Generate the sitemap
const generateSitemap = () => {
  new Sitemap(routes)
    .build('https://fantasymmadness.com') // Replace with your website URL
    .save(sitemapPath); // Save the sitemap to the public directory
};

generateSitemap();
