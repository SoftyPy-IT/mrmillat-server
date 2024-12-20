import { Router } from "express";
import { eventRoutes } from "../modules/events/events.route";
import { articleRoutes } from "../modules/articles/articles.route";
import { voiceOnMediaRoutes } from "../modules/voiceOnMedia/voiceOnMedia.route";
import { galleryRoutes } from "../modules/gallery/gallery.route";
import { featureRoutes } from "../modules/features/features.route";
import { heroSectionRoutes } from "../modules/heroSection/heroSection.route";
import { journeyToPoliticsRoutes } from "../modules/journeyToPolitics/journeyToPolitics.route";
import { biographyRoutes } from "../modules/biography/biography.route";
import { userRoutes } from "../modules/users/users.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();


const moduleRoutes = [
  {
    path:'/events',
    route:eventRoutes
  },
  {
    path:'/articles',
    route:articleRoutes
  },
  {
    path:'/voice-on-media',
    route:voiceOnMediaRoutes
  },
  {
    path:'/gallery',
    route:galleryRoutes
  },
  {
    path:'/features',
    route:featureRoutes
  },
  {
    path:'/hero-sections',
    route:heroSectionRoutes
  },
  {
    path:'/journey-to-politics',
    route:journeyToPoliticsRoutes
  },
  {
    path:'/biography',
    route:biographyRoutes
  },
  {
    path:'/users',
    route:userRoutes
  },
  {
    path:'/auth',
    route:AuthRoutes
  }
]


moduleRoutes.forEach(route=>router.use( route.path, route.route));

export default router;