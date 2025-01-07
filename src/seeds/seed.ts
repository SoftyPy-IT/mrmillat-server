import { Biography } from '../app/modules/biography/biography.model';
import { Feature } from '../app/modules/features/features.model';
import { HeroSection } from '../app/modules/heroSection/heroSection.model';
import { User } from '../app/modules/users/users.model';
import { database } from '../server';
import { biographyData, featuresData, heroSectionData, user } from './seedData';

async function seedFeatures() {
  try {
    if (database.connection.readyState === 0) {
      // console.log('Database connection not established. Exiting seed script.');
      return;
    }
    //  features
    await Feature.deleteMany();
    // console.log('Cleared existing data from Features collection');
    await Feature.create(featuresData);
    // console.log('Inserted features data successfully');

    // hero section
    await HeroSection.deleteMany();
    // console.log('Cleared existing data from hero section collection');
    await HeroSection.create(heroSectionData);
    // console.log('Inserted hero section data successfully');

    // biography
    await Biography.deleteMany();
    // console.log('Cleared existing data from Biography collection');
    await Biography.create(biographyData);
    // console.log('Inserted Biography data successfully');
    // user
    await User.deleteMany();
    // console.log('Cleared existing data from User collection');
    await User.create(user);
    console.log('Inserted user data successfully');
  } catch (error) {
    console.log('Error seeding data:', error);
  } finally {
    database.disconnect();
    console.log('Database connection closed.');
  }
}

 seedFeatures();

