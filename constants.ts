
import { Email, EmailCategory } from './types';

export const PRELOADED_EMAILS: Email[] = [
  // --- GENUINE (10) ---
  {
    id: 'g1',
    sender: 'Sarah Jenkins',
    senderEmail: 's.jenkins@techcorp.com',
    subject: 'Interview Invitation: Senior Frontend Engineer',
    body: 'Hi, \n\nWe were impressed with your profile and would like to invite you for a technical interview. Please let us know your availability for this coming Thursday.',
    preview: 'We were impressed with your profile and would...',
    date: 'Oct 24',
    initialCategory: EmailCategory.GENUINE
  },
  {
    id: 'g2',
    sender: 'CloudBank Support',
    senderEmail: 'support@cloudbank.com',
    subject: 'Monthly Transaction Statement - September 2024',
    body: 'Your monthly account statement for September is now available for download via our secure online portal. Log in to view details.',
    preview: 'Your monthly account statement for September...',
    date: 'Oct 23',
    initialCategory: EmailCategory.GENUINE
  },
  {
    id: 'g3',
    sender: 'Registrar Office',
    senderEmail: 'registrar@state-university.edu',
    subject: 'Fall Semester Results Published',
    body: 'Dear Student, the results for the Fall 2024 final examinations have been published on the student portal. Please check your grades.',
    preview: 'Dear Student, the results for the Fall 2024...',
    date: 'Oct 22',
    initialCategory: EmailCategory.GENUINE
  },
  {
    id: 'g4',
    sender: 'Project Mercury',
    senderEmail: 'notifications@slack.com',
    subject: 'New Message from Team Lead',
    body: 'Hey team, just a reminder about our standup at 10 AM tomorrow. We need to finalize the sprint plan.',
    preview: 'Hey team, just a reminder about our standup...',
    date: 'Oct 22',
    initialCategory: EmailCategory.GENUINE
  },
  {
    id: 'g5',
    sender: 'SkyHigh Airlines',
    senderEmail: 'bookings@skyhigh.com',
    subject: 'Flight Confirmation: SH-402 to London',
    body: 'Your booking for flight SH-402 is confirmed. Departure: 10th Nov, 14:00. Terminal 4. Check-in online 24h prior.',
    preview: 'Your booking for flight SH-402 is confirmed...',
    date: 'Oct 21',
    initialCategory: EmailCategory.GENUINE
  },
  {
    id: 'g6',
    sender: 'Marketing Director',
    senderEmail: 'director@agency.io',
    subject: 'Q4 Project Approval',
    body: 'Good news! The client has approved the budget for the Mercury campaign. We are clear to start production next week.',
    preview: 'Good news! The client has approved the budget...',
    date: 'Oct 20',
    initialCategory: EmailCategory.GENUINE
  },
  {
    id: 'g7',
    sender: 'HR Global',
    senderEmail: 'internships@global-inc.com',
    subject: 'Internship Selection: Congratulations!',
    body: 'We are pleased to offer you the Summer Internship position at our New York office. Attached is the offer letter.',
    preview: 'We are pleased to offer you the Summer Internship...',
    date: 'Oct 19',
    initialCategory: EmailCategory.GENUINE
  },
  {
    id: 'g8',
    sender: 'Store Logistics',
    senderEmail: 'shipping@gadgetstore.com',
    subject: 'Your Order #9821 has Shipped',
    body: 'Your package containing the "Ultra-Wide Monitor" has been handed to the courier. Tracking ID: GAD-102931.',
    preview: 'Your package containing the "Ultra-Wide Monitor"...',
    date: 'Oct 18',
    initialCategory: EmailCategory.GENUINE
  },
  {
    id: 'g9',
    sender: 'Accounts Payable',
    senderEmail: 'billing@clientcorp.com',
    subject: 'Payment Received: Invoice INV-452',
    body: 'This is an automated notification confirming receipt of your payment for invoice INV-452. Thank you for your business.',
    preview: 'This is an automated notification confirming...',
    date: 'Oct 17',
    initialCategory: EmailCategory.GENUINE
  },
  {
    id: 'g10',
    sender: 'LinkedIn',
    senderEmail: 'messages-noreply@linkedin.com',
    subject: 'John Doe wants to connect',
    body: 'John Doe, Senior Architect at FinTech, has requested to join your professional network.',
    preview: 'John Doe, Senior Architect at FinTech, has...',
    date: 'Oct 16',
    initialCategory: EmailCategory.GENUINE
  },

  // --- SPAM (10) ---
  {
    id: 's1',
    sender: 'Global Lottery',
    senderEmail: 'winner@jackpot-random.xyz',
    subject: 'YOU WON $5,000,000.00 CASH PRIZE!',
    body: 'CONGRATULATIONS! Your email was selected as the winner of the international mega draw. Reply with your bank details to claim now!!',
    preview: 'CONGRATULATIONS! Your email was selected...',
    date: '10:30 AM',
    initialCategory: EmailCategory.SPAM
  },
  {
    id: 's2',
    sender: 'Crypto Master',
    senderEmail: 'invest@bit-double.biz',
    subject: 'URGENT: Double your Bitcoin in 24 hours!',
    body: 'Exclusive opportunity for top investors. Send 0.1 BTC to our wallet and receive 0.2 BTC back instantly. Limited time offer!',
    preview: 'Exclusive opportunity for top investors. Send...',
    date: '09:15 AM',
    initialCategory: EmailCategory.SPAM
  },
  {
    id: 's3',
    sender: 'Security Alert',
    senderEmail: 'admin@verify-account-suspension.tk',
    subject: 'Your account will be DELETED in 2 hours',
    body: 'Suspicious activity detected. To prevent immediate permanent deletion of your account, click here: http://secure-login-verify.xyz/fix',
    preview: 'Suspicious activity detected. To prevent...',
    date: 'Yesterday',
    initialCategory: EmailCategory.SPAM
  },
  {
    id: 's4',
    sender: 'Banking KYC',
    senderEmail: 'noreply@bank-update-kyc.info',
    subject: 'Fake KYC Update Required - Action Needed',
    body: 'Due to new regulations, you must re-verify your identity. Failure to do so will result in card block. Update now: http://bit.ly/update-bank-info',
    preview: 'Due to new regulations, you must re-verify...',
    date: 'Yesterday',
    initialCategory: EmailCategory.SPAM
  },
  {
    id: 's5',
    sender: 'Amazon Support',
    senderEmail: 'refund-department@amzn-orders.net',
    subject: 'Your $499 Refund is Waiting',
    body: 'We noticed a double charge on your last order. To claim your $499 refund, please fill out the form at the link below.',
    preview: 'We noticed a double charge on your last order...',
    date: 'Oct 24',
    initialCategory: EmailCategory.SPAM
  },
  {
    id: 's6',
    sender: 'PayPal Fraud',
    senderEmail: 'service@pay-pal-security-verification.com',
    subject: 'Unauthorized Access to your PayPal Wallet',
    body: 'Someone from Russia tried to log in to your account. We have locked your funds. Log in here to unlock: http://pp-safety.com',
    preview: 'Someone from Russia tried to log in to your...',
    date: 'Oct 23',
    initialCategory: EmailCategory.SPAM
  },
  {
    id: 's7',
    sender: 'Investment Group',
    senderEmail: 'wealth@get-rich-fast.ru',
    subject: 'Retire in 6 months with this secret strategy',
    body: 'Banks hate this one trick! Join our elite masterclass and earn $10,000 weekly from home. No experience needed.',
    preview: 'Banks hate this one trick! Join our elite...',
    date: 'Oct 22',
    initialCategory: EmailCategory.SPAM
  },
  {
    id: 's8',
    sender: 'Prince Al-Bakir',
    senderEmail: 'family-fund@royal-legacy.ng',
    subject: 'Urgent assistance needed with $40M transfer',
    body: 'I am a member of the royal family. I have $40 million frozen in a Swiss account. I need a trusted partner to move the funds.',
    preview: 'I am a member of the royal family. I have...',
    date: 'Oct 21',
    initialCategory: EmailCategory.SPAM
  },
  {
    id: 's9',
    sender: 'Billing Dept',
    senderEmail: 'invoice-scanner@outlook.com',
    subject: 'Overdue Invoice #PDF-99281',
    body: 'Please see the attached invoice for your recent purchase. If you did not make this purchase, open the file to dispute.',
    preview: 'Please see the attached invoice for your...',
    date: 'Oct 20',
    initialCategory: EmailCategory.SPAM
  },
  {
    id: 's10',
    sender: 'Web Admin',
    senderEmail: 'no-reply@short.url',
    subject: 'New Shared Document',
    body: 'A user has shared a private document with you. View here: http://t.co/9982asdf8',
    preview: 'A user has shared a private document with...',
    date: 'Oct 19',
    initialCategory: EmailCategory.SPAM
  },

  // --- PROMOTIONS (10) ---
  {
    id: 'p1',
    sender: 'Flipkart',
    senderEmail: 'promo@flipkart-deals.com',
    subject: 'Big Billion Days: 80% OFF on Electronics!',
    body: 'The biggest sale of the year is here. Grab your favorite smartphones, laptops, and more at unbeatable prices.',
    preview: 'The biggest sale of the year is here. Grab...',
    date: '1 hour ago',
    initialCategory: EmailCategory.PROMOTIONS
  },
  {
    id: 'p2',
    sender: 'Myntra',
    senderEmail: 'style@myntra.com',
    subject: 'Fashion Refresh Sale: Styles starting at $9',
    body: 'New season, new wardrobe. Explore thousands of brands with massive discounts. Free shipping for members.',
    preview: 'New season, new wardrobe. Explore thousands...',
    date: '2 hours ago',
    initialCategory: EmailCategory.PROMOTIONS
  },
  {
    id: 'p3',
    sender: 'Zomato',
    senderEmail: 'foodie@zomato-news.com',
    subject: 'Hungry? 50% OFF on your favorite Biryani',
    body: 'Friday night deals are live! Order from top-rated restaurants and get instant cashback on your wallet.',
    preview: 'Friday night deals are live! Order from top...',
    date: '4 hours ago',
    initialCategory: EmailCategory.PROMOTIONS
  },
  {
    id: 'p4',
    sender: 'HDFC Bank',
    senderEmail: 'offers@hdfc.com',
    subject: 'Credit Card Reward: $50 Cashback on Dining',
    body: 'Use your Millennia card at any restaurant this weekend and earn 5% back. T&C apply.',
    preview: 'Use your Millennia card at any restaurant...',
    date: 'Oct 24',
    initialCategory: EmailCategory.PROMOTIONS
  },
  {
    id: 'p5',
    sender: 'MakeMyTrip',
    senderEmail: 'travel@mmt.com',
    subject: 'Maldives Calling! Flat 30% OFF on Hotels',
    body: 'Plan your dream vacation today. Exclusive flight+hotel combos starting from $599.',
    preview: 'Plan your dream vacation today. Exclusive...',
    date: 'Oct 23',
    initialCategory: EmailCategory.PROMOTIONS
  },
  {
    id: 'p6',
    sender: 'Gold Gym',
    senderEmail: 'membership@goldsgym.com',
    subject: 'Join Now & Pay NOTHING until 2025!',
    body: 'Commit to your fitness goals. 12-month membership deal with free personal trainer session.',
    preview: 'Commit to your fitness goals. 12-month...',
    date: 'Oct 22',
    initialCategory: EmailCategory.PROMOTIONS
  },
  {
    id: 'p7',
    sender: 'H&M Fashion',
    senderEmail: 'newsletter@hm.com',
    subject: 'Final Clearance: Everything must go!',
    body: 'Up to 70% off on last season collection. Visit our stores or shop online. Limited stock.',
    preview: 'Up to 70% off on last season collection...',
    date: 'Oct 21',
    initialCategory: EmailCategory.PROMOTIONS
  },
  {
    id: 'p8',
    sender: 'PlayStore',
    senderEmail: 'rewards@googleplay.com',
    subject: 'You have a $5 Credit for your next app',
    body: 'Redeem your reward on any premium app or game. Valid for the next 7 days.',
    preview: 'Redeem your reward on any premium app or...',
    date: 'Oct 20',
    initialCategory: EmailCategory.PROMOTIONS
  },
  {
    id: 'p9',
    sender: 'Netflix',
    senderEmail: 'info@netflix.com',
    subject: 'Coming this month: New Seasons and Movies',
    body: 'Check out the latest lineup of Netflix Originals. Your next favorite show is waiting.',
    preview: 'Check out the latest lineup of Netflix Originals...',
    date: 'Oct 19',
    initialCategory: EmailCategory.PROMOTIONS
  },
  {
    id: 'p10',
    sender: 'Best Buy',
    senderEmail: 'weekly-ad@bestbuy.com',
    subject: 'Early Black Friday: 4K TVs from $199',
    body: 'Why wait for November? Get Black Friday prices now on the hottest tech gadgets.',
    preview: 'Why wait for November? Get Black Friday...',
    date: 'Oct 18',
    initialCategory: EmailCategory.PROMOTIONS
  },
];
