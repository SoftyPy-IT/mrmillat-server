export type TBanner = {
  name: string;
  designation: string;
  videoUrl: string;
  updatedAt: string;
};
export type TConcernIssues = {
  issue1: string;
  issue2: string;
  issue3: string;
  issue4: string;
  issue5: string;
  issue6: string;
};
export type TOurConcernIssue = {
  title: string;
  description: string;
  imageUrl: string;
  ourConcernIssues: TConcernIssues;
};
export type TWhoWeAre = {
  title: string;
  description: string;
  videoUrl: string;
};
export type TElectionCampaign = {
  title: string;
  description: string;
  bgImageUrl: string;
  constituency: string;
  electionDate: Date;
};

export type TMission = {
  title: string;
  description: string;
  imageUrl: string;
};
export type TVision = {
  title: string;
  description: string;
  imageUrl: string;
};
export type TCompany = {
  companyName: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  websiteUrl: string;
  bgImageUrl: string;
  logoUrl: string;
};

export type TContact = {
  address: string;
  phone: string;
  email: string;
  bgImageUrl: string;
  facebookUrl: string;
  youTubeUrl: string;
  LinkedInUrl: string;
};

export type TFeatures = {
  logo: string;
  banner: TBanner;
  ourConcernIssue: TOurConcernIssue;
  whoWeAre: TWhoWeAre;
  electionCampaign: TElectionCampaign;
  homepageArticleBG: string;
  mission: TMission;
  vision: TVision;
  company: TCompany;
  contact: TContact;
};
