const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../src/config/db');

const User = require('../src/models/User');
const AthleteProfile = require('../src/models/AthleteProfile');
const CoachProfile = require('../src/models/CoachProfile');
const ScoutProfile = require('../src/models/ScoutProfile');
const Sport = require('../src/models/Sport');
const Opportunity = require('../src/models/Opportunity');
const Application = require('../src/models/Application');
const Achievement = require('../src/models/Achievement');
const Performance = require('../src/models/Performance');
const Notification = require('../src/models/Notification');
const ContactMessage = require('../src/models/ContactMessage');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    console.log('[Seed] Clearing existing collections...');

    await User.deleteMany();
    await AthleteProfile.deleteMany();
    await CoachProfile.deleteMany();
    await ScoutProfile.deleteMany();
    await Sport.deleteMany();
    await Opportunity.deleteMany();
    await Application.deleteMany();
    await Achievement.deleteMany();
    await Performance.deleteMany();
    await Notification.deleteMany();
    await ContactMessage.deleteMany();

    console.log('[Seed] Creating Sports Categories...');
    const sportsData = await Sport.insertMany([
      { name: 'Football', category: 'Team', icon: 'dribbble', description: 'Global 11-a-side team sport focusing on agility, endurance and tactical awareness.', rulesSummary: '90 minutes match, 11 players per team.' },
      { name: 'Athletics & Track', category: 'Individual', icon: 'zap', description: 'Sprints, long-distance, jump and throw events.', rulesSummary: 'Standard IAAF track & field event guidelines.' },
      { name: 'Cricket', category: 'Team', icon: 'target', description: 'Batting, bowling, fielding across formats.', rulesSummary: 'T20, One Day, and multi-day match formats.' },
      { name: 'Kabaddi', category: 'Combat', icon: 'activity', description: 'High-intensity contact sport requiring explosive strength and breath control.', rulesSummary: '7 players per side, 40-minute total duration.' },
      { name: 'Basketball', category: 'Team', icon: 'award', description: 'Fast-paced court sport demanding high vertical jump, shooting and team play.', rulesSummary: '4 quarters of 10 minutes.' },
      { name: 'Boxing', category: 'Combat', icon: 'shield', description: 'Olympic weight category boxing testing stamina, speed, and precision.', rulesSummary: '3 rounds of 3 minutes.' },
      { name: 'Wrestling', category: 'Combat', icon: 'activity', description: 'Freestyle and Greco-Roman wrestling.', rulesSummary: '2 periods of 3 minutes.' },
      { name: 'Badminton', category: 'Racquet', icon: 'circle', description: 'High-speed racquet sport evaluating quick reaction and stamina.', rulesSummary: 'Best of 3 sets to 21 points.' }
    ]);

    console.log('[Seed] Creating Administrative & Officer Accounts...');
    const adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@sportstalent.org',
      password: 'password123',
      role: 'Admin',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
    });

    const coachUser = await User.create({
      name: 'Rajesh Sharma',
      email: 'coach.rajesh@academy.org',
      password: 'password123',
      role: 'Coach',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
    });

    await CoachProfile.create({
      user: coachUser._id,
      organization: 'National High Performance Sports Center',
      sport: 'Football',
      experienceYears: 12,
      location: 'New Delhi',
      credentials: ['AFC A-License Coach', 'ISL Youth Scout'],
      bio: 'Dedicated to discovering hidden talent from rural villages and training them into national elite champions.'
    });

    const scoutUser = await User.create({
      name: 'Vikramaditya Rao',
      email: 'scout.vikram@scoutnetwork.org',
      password: 'password123',
      role: 'Scout',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
    });

    await ScoutProfile.create({
      user: scoutUser._id,
      organization: 'Apex Talent Scout Agency',
      region: 'North & East India',
      sportsOfInterest: ['Football', 'Athletics & Track', 'Kabaddi'],
      verificationStatus: 'Verified',
      bio: 'Professional talent identification officer connecting grassroots prodigies with top tier leagues.'
    });

    console.log('[Seed] Creating Rural & Underserved Athlete Accounts...');
    const athletesRaw = [
      {
        name: 'Ramesh Kumar',
        email: 'ramesh.football@gmail.com',
        sport: 'Football',
        position: 'Striker / Left Winger',
        location: { state: 'Punjab', district: 'Ludhiana', villageCity: 'Khanna Village' },
        age: 18,
        gender: 'Male',
        score: 92,
        speed: 34.2,
        jump: 72,
        bio: 'Self-taught striker from Khanna Village with explosive sprint speed. Won state-level rural tournament MVP.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
        verified: true
      },
      {
        name: 'Sunita Devi',
        email: 'sunita.sprint@gmail.com',
        sport: 'Athletics & Track',
        position: '100m / 200m Sprint',
        location: { state: 'Odisha', district: 'Sambalpur', villageCity: 'Rengali' },
        age: 19,
        gender: 'Female',
        score: 95,
        speed: 35.8,
        jump: 78,
        bio: 'National Junior Athletics medalist running barefoot on village dirt tracks. Seeking professional coaching facility.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        verified: true
      },
      {
        name: 'Rahul Verma',
        email: 'rahul.bowler@gmail.com',
        sport: 'Cricket',
        position: 'Right-Arm Fast Bowler',
        location: { state: 'Jharkhand', district: 'Ranchi', villageCity: 'Tupudana' },
        age: 20,
        gender: 'Male',
        score: 88,
        speed: 31.5,
        jump: 68,
        bio: 'Consistently bowls 138+ km/h pace bowling in regional club tournaments with natural inswing.',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
        verified: true
      },
      {
        name: 'Priya Singh',
        email: 'priya.kabaddi@gmail.com',
        sport: 'Kabaddi',
        position: 'Right Raider',
        location: { state: 'Haryana', district: 'Rohtak', villageCity: 'Mham' },
        age: 17,
        gender: 'Female',
        score: 90,
        speed: 30.8,
        jump: 70,
        bio: 'Agile raider with exceptional toe-touch precision and multi-point raid abilities.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
        verified: true
      },
      {
        name: 'Amit Sharma',
        email: 'amit.hoops@gmail.com',
        sport: 'Basketball',
        position: 'Point Guard',
        location: { state: 'Uttar Pradesh', district: 'Meerut', villageCity: 'Kankarkhera' },
        age: 19,
        gender: 'Male',
        score: 86,
        speed: 32.0,
        jump: 84,
        bio: 'Floor general with high court vision, 3-point range, and 84cm vertical bounce.',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
        verified: false
      }
    ];

    const createdAthletes = [];
    for (const a of athletesRaw) {
      const user = await User.create({
        name: a.name,
        email: a.email,
        password: 'password123',
        role: 'Athlete',
        avatar: a.avatar,
        isVerified: a.verified
      });

      const profile = await AthleteProfile.create({
        user: user._id,
        sport: a.sport,
        position: a.position,
        location: a.location,
        age: a.age,
        gender: a.gender,
        bio: a.bio,
        skills: ['Speed & Acceleration', 'Stamina', 'Tactical Positioning', 'High Discipline'],
        availability: 'Immediate',
        verificationBadge: a.verified,
        stats: {
          overallScore: a.score,
          sprintSpeedKmh: a.speed,
          verticalJumpCm: a.jump,
          staminaIndex: 89,
          agilityScore: 88
        },
        videos: [
          { title: `${a.sport} Match Highlights 2026`, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: a.avatar }
        ]
      });

      await Achievement.create({
        athlete: user._id,
        title: `State Junior Championship - Gold Medal (${a.sport})`,
        category: 'State',
        year: 2025,
        organization: 'State Sports Authority',
        description: 'First place finish out of 64 competing district athletes.'
      });

      await Performance.create({
        athlete: user._id,
        metricName: '100m Combine Sprint Test',
        metricValue: Number((11.2 - (a.score / 100)).toFixed(2)),
        unit: 'sec',
        verifiedBy: 'State Academy Assessment Unit'
      });

      createdAthletes.push({ user, profile });
    }

    console.log('[Seed] Creating Opportunities...');
    const opp1 = await Opportunity.create({
      creator: coachUser._id,
      title: 'National Grassroots Under-20 Football Scouting Trials',
      type: 'Sports Trial',
      sport: 'Football',
      organization: 'National High Performance Sports Center',
      location: 'Jawaharlal Nehru Stadium, New Delhi',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      description: 'Comprehensive 3-day open combine trial for elite village strikers, midfielders, and defenders aiming for national academy selection.',
      requirements: ['Under 20 years of age', 'Verified match video or district recommendation', 'Biometric fitness test compliance']
    });

    const opp2 = await Opportunity.create({
      creator: scoutUser._id,
      title: 'Rural Sprint & Track Talent Identification Camp',
      type: 'Talent Hunt',
      sport: 'Athletics & Track',
      organization: 'Apex Talent Scout Agency',
      location: 'Kalinga Stadium, Bhubaneswar, Odisha',
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      description: 'Full sponsorship and equipment scholarship trial for fast rural sprinters from Odisha, Jharkhand, and Bengal.',
      requirements: ['Sub 11.5s 100m sprint timing (Male) / Sub 12.5s (Female)', 'Age 15 to 22']
    });

    const opp3 = await Opportunity.create({
      creator: coachUser._id,
      title: 'State Pro Kabaddi League Selection Trials',
      type: 'Sports Trial',
      sport: 'Kabaddi',
      organization: 'Haryana Kabaddi League',
      location: 'Tau Devi Lal Sports Complex, Gurgaon',
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      description: 'Direct trial for raiders and defenders seeking placement in upcoming seasonal Pro Kabaddi franchise teams.',
      requirements: ['Verified video proof of multi-point raids or successful tackles']
    });

    console.log('[Seed] Creating Sample Applications & Notifications...');
    await Application.create({
      opportunity: opp1._id,
      athlete: createdAthletes[0].user._id,
      coverNote: 'I am the top scorer from Ludhiana district rural league with 18 goals in 10 matches. Eager to test at national level.',
      status: 'Shortlisted'
    });

    await Application.create({
      opportunity: opp2._id,
      athlete: createdAthletes[1].user._id,
      coverNote: 'I hold the Sambalpur district 100m record (11.8s). Ready for biometric verification.',
      status: 'Under Review'
    });

    await Notification.create({
      user: createdAthletes[0].user._id,
      title: 'Application Shortlisted!',
      message: 'Your application for National Grassroots Under-20 Football Scouting Trials has been shortlisted for stage 2 trials.',
      link: '/dashboard'
    });

    await ContactMessage.create({
      name: 'Manish Verma',
      email: 'manish.parent@gmail.com',
      subject: 'Inquiry regarding rural trial center access',
      message: 'Hello, our village sports club in Bihar has 5 talented runners. How can we organize a local combine trial?'
    });

    console.log('[Seed] Database successfully seeded!');
    console.log('---------------------------------------------------------');
    console.log('Sample Logins:');
    console.log('  Admin User:   admin@sportstalent.org   / password123');
    console.log('  Coach User:   coach.rajesh@academy.org / password123');
    console.log('  Scout User:   scout.vikram@scoutnetwork.org / password123');
    console.log('  Athlete User: ramesh.football@gmail.com / password123');
    console.log('---------------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
