import { model, Schema } from 'mongoose';
import {
  TBanner,
  TCompany,
  TConcernIssues,
  TContact,
  TElectionCampaign,
  TFeatures,
  TMission,
  TOurConcernIssue,
  TVision,
  TWhoWeAre,
} from './features.interface';

const BannerSchema = new Schema<TBanner>(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    videoUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const ConcernIssuesSchema = new Schema<TConcernIssues>(
  {
    issue1: { type: String, required: true },
    issue2: { type: String, required: true },
    issue3: { type: String, required: true },
    issue4: { type: String, required: true },
    issue5: { type: String, required: true },
    issue6: { type: String, required: true },
  },
  { _id: false },
);

const OurConcernIssueSchema = new Schema<TOurConcernIssue>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    ourConcernIssues: {
      type: ConcernIssuesSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const WhoWeAreSchema = new Schema<TWhoWeAre>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const ElectionCampaignSchema = new Schema<TElectionCampaign>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bgImageUrl: { type: String, required: true },
    constituency: { type: String, required: true },
    electionDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

const MissionSchema = new Schema<TMission>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const VisionSchema = new Schema<TVision>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const CompanySchema = new Schema<TCompany>(
  {
    companyName: { type: String, required: true },
    title: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    bgImageUrl: { type: String, required: true },
    logoUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const ContactSchema = new Schema<TContact>(
  {
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    bgImageUrl: { type: String, required: true },
    facebookUrl: { type: String, required: true },
    youTubeUrl: { type: String, required: true },
    LinkedInUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const FeaturesSchema = new Schema<TFeatures>(
  {
    logo: { type: String, required: true },
    banner: { type: BannerSchema, required: true },
    ourConcernIssue: { type: OurConcernIssueSchema, required: true },
    whoWeAre: { type: WhoWeAreSchema, required: true },
    electionCampaign: { type: ElectionCampaignSchema, required: true },
    homepageArticleBG: { type: String, required: true },
    mission: { type: MissionSchema, required: true },
    vision: { type: VisionSchema, required: true },
    company: { type: CompanySchema, required: true },
    contact: { type: ContactSchema, required: true },
  },
  { timestamps: true },
);

export const Feature = model<TFeatures>('Feature', FeaturesSchema);
