import { z } from 'zod';

const BannerValidationSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: 'Banner name must be a string',
      })
      .optional(),
    designation: z
      .string({
        invalid_type_error: 'Banner description must be a string',
      })
      .optional(),
    videoUrl: z
      .string({
        invalid_type_error: 'bgImageUrl must be a valid string',
      })
      .optional(),
  })
  .optional();

const OurConcernIssueSchema = z
  .object({
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
    imageUrl: z
      .string({
        invalid_type_error: 'Image URL must be a valid string',
      })
      .optional(),
    ourConcernIssues: z
      .object({
        issue1: z.string(),
        issue2: z.string(),
        issue3: z.string(),
        issue4: z.string(),
        issue5: z.string(),
        issue6: z.string(),
      })
      .optional(),
  })
  .optional();

const WhoWeAreValidationSchema = z
  .object({
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
    videoUrl: z
      .string({
        invalid_type_error: 'Video URL must be a valid string',
      })
      .optional(),
  })
  .optional();

const ElectionCampaignValidationSchema = z
  .object({
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
    bgImageUrl: z
      .string({
        invalid_type_error: 'bgImageUrl must be a valid string',
      })
      .optional(),
    constituency: z
      .string({
        invalid_type_error: 'Constituency must be a string',
      })
      .optional(),
    electionDate: z.string().optional(),
  })
  .optional();

const MissionValidationSchema = z
  .object({
    title: z
      .string({
        invalid_type_error: 'Mission title must be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Mission description must be a string',
      })
      .optional(),
    imageUrl: z
      .string({
        invalid_type_error: 'Image URL must be a valid string',
      })
      .optional(),
  })
  .optional();

const VisionValidationSchema = z
  .object({
    title: z
      .string({
        invalid_type_error: 'Vision title must be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Vision description must be a string',
      })
      .optional(),
    imageUrl: z
      .string({
        invalid_type_error: 'Image URL must be a valid string',
      })
      .optional(),
  })
  .optional();

const CompanyValidationSchema = z
  .object({
    companyName: z
      .string({
        invalid_type_error: 'Company name must be a string',
      })
      .optional(),
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
      })
      .optional(),
    address: z
      .string({
        invalid_type_error: 'Address must be a string',
      })
      .optional(),
    phone: z
      .string({
        invalid_type_error: 'Phone number must be a string',
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .optional(),
    websiteUrl: z
      .string({
        invalid_type_error: 'Website URL must be a valid string',
      })
      .optional(),
    bgImageUrl: z
      .string({
        invalid_type_error: 'bgImageUrl must be a valid string',
      })
      .optional(),
    logoUrl: z
      .string({
        invalid_type_error: 'Logo URL must be a valid string',
      })
      .optional(),
  })
  .optional();

const ContactValidationSchema = z
  .object({
    address: z
      .string({
        invalid_type_error: 'Address must be a string',
      })
      .optional(),
    phone: z
      .string({
        invalid_type_error: 'Phone number must be a string',
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address')
      .optional(),
    bgImageUrl: z
      .string({
        invalid_type_error: 'bgImageUrl must be a valid string',
      })
      .optional(),
    facebookUrl: z
      .string({
        invalid_type_error: 'bgImageUrl must be a valid string',
      })
      .optional(),
    youTubeUrl: z
      .string({
        invalid_type_error: 'bgImageUrl must be a valid string',
      })
      .optional(),
    LinkedInUrl: z
      .string({
        invalid_type_error: 'bgImageUrl must be a valid string',
      })
      .optional(),
  })
  .optional();

const FeaturesUpdateValidationSchema = z.object({
  body: z.object({
    logo: z.string().optional(),

    banner: BannerValidationSchema,

    ourConcernIssue: OurConcernIssueSchema,

    whoWeAre: WhoWeAreValidationSchema,

    electionCampaign: ElectionCampaignValidationSchema,

    homepageArticleBG: z.string().optional(),

    mission: MissionValidationSchema,

    vision: VisionValidationSchema,

    company: CompanyValidationSchema,

    contact: ContactValidationSchema,
  }),
});

export const featuresValidation = {
  FeaturesUpdateValidationSchema,
};
