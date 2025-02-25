import {StoryblokStory} from 'storyblok-generate-ts'

export interface AllArticlesStoryblok {
  title?: string;
  _uid: string;
  component: "AllArticles";
  [k: string]: any;
}

export interface AssetStoryblok {
  _uid?: string;
  id: number | null;
  alt: string | null;
  name: string;
  focus: string | null;
  source: string | null;
  title: string | null;
  filename: string;
  copyright: string | null;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface ArticleStoryblok {
  image: AssetStoryblok;
  title: string;
  date?: string;
  teaser?: string;
  content?: RichtextStoryblok;
  _uid: string;
  component: "Article";
  [k: string]: any;
}

export interface ArticleCardStoryblok {
  post?: StoryblokStory<ArticleStoryblok> | string;
  _uid: string;
  component: "ArticleCard";
  [k: string]: any;
}

export interface BannerStoryblok {
  image: AssetStoryblok;
  bannerTitle?: string;
  bannerText?: string;
  _uid: string;
  component: "Banner";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

export interface ButtonOutlineStoryblok {
  text?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "ButtonOutline";
  [k: string]: any;
}

export interface CalloutContainerStoryblok {
  items: CalloutItemStoryblok[];
  _uid: string;
  component: "CalloutContainer";
  [k: string]: any;
}

export interface CalloutItemStoryblok {
  icon: "fa6-solid:handshake" | "fa6-solid:eye" | "fa6-solid:compass" | "fa6-solid:binoculars";
  heading: string;
  content: RichtextStoryblok;
  _uid: string;
  component: "CalloutItem";
  [k: string]: any;
}

export interface ChipButtonStoryblok {
  text?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "ChipButton";
  [k: string]: any;
}

export interface ColumnTwoDividerStoryblok {
  header?: string;
  headerOne?: string;
  contentOne?: string;
  headerTwo?: string;
  contentTwo?: string;
  _uid: string;
  component: "ColumnTwoDivider";
  [k: string]: any;
}

export interface ContactCtaStoryblok {
  body: ContactCtaItemStoryblok[];
  _uid: string;
  component: "ContactCTA";
  [k: string]: any;
}

export interface ContactCtaItemStoryblok {
  title: string;
  icon: "fa6-solid:house" | "fa6-solid:user";
  content: RichtextStoryblok;
  buttons: ChipButtonStoryblok[];
  _uid: string;
  component: "ContactCTAItem";
  [k: string]: any;
}

export interface ContentCtaStoryblok {
  title?: string;
  text?: string;
  ctas?: (PrimaryButtonStoryblok | SecondaryButtonStoryblok | ButtonOutlineStoryblok)[];
  _uid: string;
  component: "ContentCTA";
  [k: string]: any;
}

export interface ContentFloaterStoryblok {
  contentFloaterTitle?: string;
  contentFloaterBigText?: string;
  contentFloaterSmallText?: string;
  contentFloaterFigures?: (ContentFloaterFigureAnimatedStoryblok | ContentFloaterFigureStoryblok)[];
  _uid: string;
  component: "ContentFloater";
  [k: string]: any;
}

export interface ContentFloaterFigureStoryblok {
  value?: string;
  text?: string;
  _uid: string;
  component: "ContentFloaterFigure";
  [k: string]: any;
}

export interface ContentFloaterFigureAnimatedStoryblok {
  label?: string;
  starting_value: string;
  ending_value?: string;
  time: string;
  prepend?: string;
  append?: string;
  _uid: string;
  component: "ContentFloaterFigureAnimated";
  [k: string]: any;
}

export interface ContentImageStoryblok {
  image?: AssetStoryblok;
  text?: string;
  imageLeft: boolean;
  _uid: string;
  component: "ContentImage";
  [k: string]: any;
}

export interface DividerStoryblok {
  size: "none" | "sm" | "md" | "lg" | "xl";
  line_thickness: "none" | "sm" | "md" | "lg" | "xl";
  line_width: "sm" | "md" | "lg" | "xl" | "full";
  line_color: "primary-light" | "primary-medium" | "primary-dark" | "accent-light" | "accent-dark";
  _uid: string;
  component: "Divider";
  [k: string]: any;
}

export interface FeatureStoryblok {
  name?: string;
  _uid: string;
  component: "feature";
  [k: string]: any;
}

export interface FeaturesStoryblok {
  _uid: string;
  component: "Features";
  [k: string]: any;
}

export interface FooterBlokStoryblok {
  links?: FooterLinkStoryblok[];
  icons?: IconLinkStoryblok[];
  copy?: string;
  _uid: string;
  component: "FooterBlok";
  [k: string]: any;
}

export interface FooterLinkStoryblok {
  text?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "FooterLink";
  [k: string]: any;
}

export interface FullPageHeroStoryblok {
  image?: AssetStoryblok;
  title?: string;
  body?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | ArticleCardStoryblok
    | BannerStoryblok
    | ButtonOutlineStoryblok
    | CalloutContainerStoryblok
    | CalloutItemStoryblok
    | ChipButtonStoryblok
    | ColumnTwoDividerStoryblok
    | ContactCtaStoryblok
    | ContactCtaItemStoryblok
    | ContentCtaStoryblok
    | ContentFloaterStoryblok
    | ContentFloaterFigureStoryblok
    | ContentFloaterFigureAnimatedStoryblok
    | ContentImageStoryblok
    | DividerStoryblok
    | FeatureStoryblok
    | FeaturesStoryblok
    | FooterBlokStoryblok
    | FooterLinkStoryblok
    | FullPageHeroStoryblok
    | GalleryStoryblok
    | GalleryCustomStoryblok
    | GalleryPanelStoryblok
    | GalleryPreviewStoryblok
    | GetInTouchStoryblok
    | GridStoryblok
    | HeaderBannerStoryblok
    | HeroStoryblok
    | HeroVideoStoryblok
    | HomeFeaturesStoryblok
    | HomeFeaturesPanelStoryblok
    | HomeModelStoryblok
    | HubSpotFormStoryblok
    | IconLinkStoryblok
    | IframeBlokStoryblok
    | ImageCardStoryblok
    | LayoutStoryblok
    | ModelStatStoryblok
    | NavBarStoryblok
    | NavBarDropdownStoryblok
    | NavBarDropdownLinkStoryblok
    | NavBarLinkStoryblok
    | NavBarMobileDisclosureStoryblok
    | NavBarMobileDisclosureLinkStoryblok
    | NavBarMobileLinkStoryblok
    | PageStoryblok
    | PictureContainerStoryblok
    | PopularArticlesStoryblok
    | PrimaryButtonStoryblok
    | PtrCallToActionStoryblok
    | PtrDiscoverWhyStoryblok
    | PtrHeaderStoryblok
    | PtrHeroStoryblok
    | SecondaryButtonStoryblok
    | SelectHomeModelStoryblok
    | StandardContainerStoryblok
    | StatDataStoryblok
    | TabsVerticleFloaterStoryblok
    | TabsVerticleFloaterTabStoryblok
    | TeaserStoryblok
    | TestimonialStoryblok
    | TestimonialSliderStoryblok
    | ThreeColumnStoryblok
    | TitleBlokStoryblok
    | YoutubeEmbedStoryblok
  )[];
  _uid: string;
  component: "FullPageHero";
  [k: string]: any;
}

export interface GalleryStoryblok {
  headingImage?: AssetStoryblok;
  panels?: GalleryPanelStoryblok[];
  _uid: string;
  component: "Gallery";
  [k: string]: any;
}

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}[];

export interface GalleryCustomStoryblok {
  images?: MultiassetStoryblok;
  _uid: string;
  component: "GalleryCustom";
  [k: string]: any;
}

export interface GalleryPanelStoryblok {
  heading?: string;
  images?: MultiassetStoryblok;
  _uid: string;
  component: "GalleryPanel";
  [k: string]: any;
}

export interface GalleryPreviewStoryblok {
  title?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  images?: MultiassetStoryblok;
  _uid: string;
  component: "GalleryPreview";
  [k: string]: any;
}

export interface GetInTouchStoryblok {
  title?: string;
  description?: string;
  addressLineOne?: string;
  addressLineTwo?: string;
  mapsLink?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  telNumber?: string;
  telLink?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  email?: string;
  emailLink?: Exclude<MultilinkStoryblok, {linktype?: "asset"}>;
  form?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | ArticleCardStoryblok
    | BannerStoryblok
    | ButtonOutlineStoryblok
    | CalloutContainerStoryblok
    | CalloutItemStoryblok
    | ChipButtonStoryblok
    | ColumnTwoDividerStoryblok
    | ContactCtaStoryblok
    | ContactCtaItemStoryblok
    | ContentCtaStoryblok
    | ContentFloaterStoryblok
    | ContentFloaterFigureStoryblok
    | ContentFloaterFigureAnimatedStoryblok
    | ContentImageStoryblok
    | DividerStoryblok
    | FeatureStoryblok
    | FeaturesStoryblok
    | FooterBlokStoryblok
    | FooterLinkStoryblok
    | FullPageHeroStoryblok
    | GalleryStoryblok
    | GalleryCustomStoryblok
    | GalleryPanelStoryblok
    | GalleryPreviewStoryblok
    | GetInTouchStoryblok
    | GridStoryblok
    | HeaderBannerStoryblok
    | HeroStoryblok
    | HeroVideoStoryblok
    | HomeFeaturesStoryblok
    | HomeFeaturesPanelStoryblok
    | HomeModelStoryblok
    | HubSpotFormStoryblok
    | IconLinkStoryblok
    | IframeBlokStoryblok
    | ImageCardStoryblok
    | LayoutStoryblok
    | ModelStatStoryblok
    | NavBarStoryblok
    | NavBarDropdownStoryblok
    | NavBarDropdownLinkStoryblok
    | NavBarLinkStoryblok
    | NavBarMobileDisclosureStoryblok
    | NavBarMobileDisclosureLinkStoryblok
    | NavBarMobileLinkStoryblok
    | PageStoryblok
    | PictureContainerStoryblok
    | PopularArticlesStoryblok
    | PrimaryButtonStoryblok
    | PtrCallToActionStoryblok
    | PtrDiscoverWhyStoryblok
    | PtrHeaderStoryblok
    | PtrHeroStoryblok
    | SecondaryButtonStoryblok
    | SelectHomeModelStoryblok
    | StandardContainerStoryblok
    | StatDataStoryblok
    | TabsVerticleFloaterStoryblok
    | TabsVerticleFloaterTabStoryblok
    | TeaserStoryblok
    | TestimonialStoryblok
    | TestimonialSliderStoryblok
    | ThreeColumnStoryblok
    | TitleBlokStoryblok
    | YoutubeEmbedStoryblok
  )[];
  _uid: string;
  component: "GetInTouch";
  [k: string]: any;
}

export interface GridStoryblok {
  columns?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | ArticleCardStoryblok
    | BannerStoryblok
    | ButtonOutlineStoryblok
    | CalloutContainerStoryblok
    | CalloutItemStoryblok
    | ChipButtonStoryblok
    | ColumnTwoDividerStoryblok
    | ContactCtaStoryblok
    | ContactCtaItemStoryblok
    | ContentCtaStoryblok
    | ContentFloaterStoryblok
    | ContentFloaterFigureStoryblok
    | ContentFloaterFigureAnimatedStoryblok
    | ContentImageStoryblok
    | DividerStoryblok
    | FeatureStoryblok
    | FeaturesStoryblok
    | FooterBlokStoryblok
    | FooterLinkStoryblok
    | FullPageHeroStoryblok
    | GalleryStoryblok
    | GalleryCustomStoryblok
    | GalleryPanelStoryblok
    | GalleryPreviewStoryblok
    | GetInTouchStoryblok
    | GridStoryblok
    | HeaderBannerStoryblok
    | HeroStoryblok
    | HeroVideoStoryblok
    | HomeFeaturesStoryblok
    | HomeFeaturesPanelStoryblok
    | HomeModelStoryblok
    | HubSpotFormStoryblok
    | IconLinkStoryblok
    | IframeBlokStoryblok
    | ImageCardStoryblok
    | LayoutStoryblok
    | ModelStatStoryblok
    | NavBarStoryblok
    | NavBarDropdownStoryblok
    | NavBarDropdownLinkStoryblok
    | NavBarLinkStoryblok
    | NavBarMobileDisclosureStoryblok
    | NavBarMobileDisclosureLinkStoryblok
    | NavBarMobileLinkStoryblok
    | PageStoryblok
    | PictureContainerStoryblok
    | PopularArticlesStoryblok
    | PrimaryButtonStoryblok
    | PtrCallToActionStoryblok
    | PtrDiscoverWhyStoryblok
    | PtrHeaderStoryblok
    | PtrHeroStoryblok
    | SecondaryButtonStoryblok
    | SelectHomeModelStoryblok
    | StandardContainerStoryblok
    | StatDataStoryblok
    | TabsVerticleFloaterStoryblok
    | TabsVerticleFloaterTabStoryblok
    | TeaserStoryblok
    | TestimonialStoryblok
    | TestimonialSliderStoryblok
    | ThreeColumnStoryblok
    | TitleBlokStoryblok
    | YoutubeEmbedStoryblok
  )[];
  _uid: string;
  component: "grid";
  [k: string]: any;
}

export interface HeaderBannerStoryblok {
  text?: RichtextStoryblok;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "HeaderBanner";
  [k: string]: any;
}

export interface HeroStoryblok {
  title: string;
  bigText: string;
  smallText?: string;
  image: AssetStoryblok;
  _uid: string;
  component: "Hero";
  [k: string]: any;
}

export interface HeroVideoStoryblok {
  topButton?: any;
  topButtonText?: string;
  topButtonLink?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  video?: AssetStoryblok;
  bigText?: string;
  smallText?: string;
  ctas?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | ArticleCardStoryblok
    | BannerStoryblok
    | ButtonOutlineStoryblok
    | CalloutContainerStoryblok
    | CalloutItemStoryblok
    | ChipButtonStoryblok
    | ColumnTwoDividerStoryblok
    | ContactCtaStoryblok
    | ContactCtaItemStoryblok
    | ContentCtaStoryblok
    | ContentFloaterStoryblok
    | ContentFloaterFigureStoryblok
    | ContentFloaterFigureAnimatedStoryblok
    | ContentImageStoryblok
    | DividerStoryblok
    | FeatureStoryblok
    | FeaturesStoryblok
    | FooterBlokStoryblok
    | FooterLinkStoryblok
    | FullPageHeroStoryblok
    | GalleryStoryblok
    | GalleryCustomStoryblok
    | GalleryPanelStoryblok
    | GalleryPreviewStoryblok
    | GetInTouchStoryblok
    | GridStoryblok
    | HeaderBannerStoryblok
    | HeroStoryblok
    | HeroVideoStoryblok
    | HomeFeaturesStoryblok
    | HomeFeaturesPanelStoryblok
    | HomeModelStoryblok
    | HubSpotFormStoryblok
    | IconLinkStoryblok
    | IframeBlokStoryblok
    | ImageCardStoryblok
    | LayoutStoryblok
    | ModelStatStoryblok
    | NavBarStoryblok
    | NavBarDropdownStoryblok
    | NavBarDropdownLinkStoryblok
    | NavBarLinkStoryblok
    | NavBarMobileDisclosureStoryblok
    | NavBarMobileDisclosureLinkStoryblok
    | NavBarMobileLinkStoryblok
    | PageStoryblok
    | PictureContainerStoryblok
    | PopularArticlesStoryblok
    | PrimaryButtonStoryblok
    | PtrCallToActionStoryblok
    | PtrDiscoverWhyStoryblok
    | PtrHeaderStoryblok
    | PtrHeroStoryblok
    | SecondaryButtonStoryblok
    | SelectHomeModelStoryblok
    | StandardContainerStoryblok
    | StatDataStoryblok
    | TabsVerticleFloaterStoryblok
    | TabsVerticleFloaterTabStoryblok
    | TeaserStoryblok
    | TestimonialStoryblok
    | TestimonialSliderStoryblok
    | ThreeColumnStoryblok
    | TitleBlokStoryblok
    | YoutubeEmbedStoryblok
  )[];
  _uid: string;
  component: "HeroVideo";
  [k: string]: any;
}

export interface HomeFeaturesStoryblok {
  title?: string;
  stats?: StatDataStoryblok[];
  panels?: HomeFeaturesPanelStoryblok[];
  _uid: string;
  component: "HomeFeatures";
  [k: string]: any;
}

export interface HomeFeaturesPanelStoryblok {
  heading?: string;
  content?: RichtextStoryblok;
  images?: MultiassetStoryblok;
  _uid: string;
  component: "HomeFeaturesPanel";
  [k: string]: any;
}

export interface HomeModelStoryblok {
  model?: string;
  series?: string;
  featuredImage: AssetStoryblok;
  floorPlan?: AssetStoryblok;
  matterPortLink?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  matterPortImage?: AssetStoryblok;
  stats?: ModelStatStoryblok[];
  body?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | ArticleCardStoryblok
    | BannerStoryblok
    | ButtonOutlineStoryblok
    | CalloutContainerStoryblok
    | CalloutItemStoryblok
    | ChipButtonStoryblok
    | ColumnTwoDividerStoryblok
    | ContactCtaStoryblok
    | ContactCtaItemStoryblok
    | ContentCtaStoryblok
    | ContentFloaterStoryblok
    | ContentFloaterFigureStoryblok
    | ContentFloaterFigureAnimatedStoryblok
    | ContentImageStoryblok
    | DividerStoryblok
    | FeatureStoryblok
    | FeaturesStoryblok
    | FooterBlokStoryblok
    | FooterLinkStoryblok
    | FullPageHeroStoryblok
    | GalleryStoryblok
    | GalleryCustomStoryblok
    | GalleryPanelStoryblok
    | GalleryPreviewStoryblok
    | GetInTouchStoryblok
    | GridStoryblok
    | HeaderBannerStoryblok
    | HeroStoryblok
    | HeroVideoStoryblok
    | HomeFeaturesStoryblok
    | HomeFeaturesPanelStoryblok
    | HomeModelStoryblok
    | HubSpotFormStoryblok
    | IconLinkStoryblok
    | IframeBlokStoryblok
    | ImageCardStoryblok
    | LayoutStoryblok
    | ModelStatStoryblok
    | NavBarStoryblok
    | NavBarDropdownStoryblok
    | NavBarDropdownLinkStoryblok
    | NavBarLinkStoryblok
    | NavBarMobileDisclosureStoryblok
    | NavBarMobileDisclosureLinkStoryblok
    | NavBarMobileLinkStoryblok
    | PageStoryblok
    | PictureContainerStoryblok
    | PopularArticlesStoryblok
    | PrimaryButtonStoryblok
    | PtrCallToActionStoryblok
    | PtrDiscoverWhyStoryblok
    | PtrHeaderStoryblok
    | PtrHeroStoryblok
    | SecondaryButtonStoryblok
    | SelectHomeModelStoryblok
    | StandardContainerStoryblok
    | StatDataStoryblok
    | TabsVerticleFloaterStoryblok
    | TabsVerticleFloaterTabStoryblok
    | TeaserStoryblok
    | TestimonialStoryblok
    | TestimonialSliderStoryblok
    | ThreeColumnStoryblok
    | TitleBlokStoryblok
    | YoutubeEmbedStoryblok
  )[];
  _uid: string;
  component: "HomeModel";
  [k: string]: any;
}

export interface HubSpotFormStoryblok {
  region?: string;
  portalId?: string;
  formId?: string;
  _uid: string;
  component: "HubSpotForm";
  [k: string]: any;
}

export interface IconLinkStoryblok {
  alt: string;
  icon:
    | ""
    | "simple-icons:facebook"
    | "simple-icons:pinterest"
    | "simple-icons:houzz"
    | "simple-icons:instagram"
    | "simple-icons:linkedin"
    | "BuilderTrendLogo";
  link: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  size: "" | "small" | "medium" | "large";
  _uid: string;
  component: "IconLink";
  [k: string]: any;
}

export interface IframeBlokStoryblok {
  url: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "iframeBlok";
  [k: string]: any;
}

export interface ImageCardStoryblok {
  image?: AssetStoryblok;
  category?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  preheading?: string;
  heading?: string;
  subheading?: string;
  _uid: string;
  component: "ImageCard";
  [k: string]: any;
}

export interface LayoutStoryblok {
  header?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | ArticleCardStoryblok
    | BannerStoryblok
    | ButtonOutlineStoryblok
    | CalloutContainerStoryblok
    | CalloutItemStoryblok
    | ChipButtonStoryblok
    | ColumnTwoDividerStoryblok
    | ContactCtaStoryblok
    | ContactCtaItemStoryblok
    | ContentCtaStoryblok
    | ContentFloaterStoryblok
    | ContentFloaterFigureStoryblok
    | ContentFloaterFigureAnimatedStoryblok
    | ContentImageStoryblok
    | DividerStoryblok
    | FeatureStoryblok
    | FeaturesStoryblok
    | FooterBlokStoryblok
    | FooterLinkStoryblok
    | FullPageHeroStoryblok
    | GalleryStoryblok
    | GalleryCustomStoryblok
    | GalleryPanelStoryblok
    | GalleryPreviewStoryblok
    | GetInTouchStoryblok
    | GridStoryblok
    | HeaderBannerStoryblok
    | HeroStoryblok
    | HeroVideoStoryblok
    | HomeFeaturesStoryblok
    | HomeFeaturesPanelStoryblok
    | HomeModelStoryblok
    | HubSpotFormStoryblok
    | IconLinkStoryblok
    | IframeBlokStoryblok
    | ImageCardStoryblok
    | LayoutStoryblok
    | ModelStatStoryblok
    | NavBarStoryblok
    | NavBarDropdownStoryblok
    | NavBarDropdownLinkStoryblok
    | NavBarLinkStoryblok
    | NavBarMobileDisclosureStoryblok
    | NavBarMobileDisclosureLinkStoryblok
    | NavBarMobileLinkStoryblok
    | PageStoryblok
    | PictureContainerStoryblok
    | PopularArticlesStoryblok
    | PrimaryButtonStoryblok
    | PtrCallToActionStoryblok
    | PtrDiscoverWhyStoryblok
    | PtrHeaderStoryblok
    | PtrHeroStoryblok
    | SecondaryButtonStoryblok
    | SelectHomeModelStoryblok
    | StandardContainerStoryblok
    | StatDataStoryblok
    | TabsVerticleFloaterStoryblok
    | TabsVerticleFloaterTabStoryblok
    | TeaserStoryblok
    | TestimonialStoryblok
    | TestimonialSliderStoryblok
    | ThreeColumnStoryblok
    | TitleBlokStoryblok
    | YoutubeEmbedStoryblok
  )[];
  footer?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | ArticleCardStoryblok
    | BannerStoryblok
    | ButtonOutlineStoryblok
    | CalloutContainerStoryblok
    | CalloutItemStoryblok
    | ChipButtonStoryblok
    | ColumnTwoDividerStoryblok
    | ContactCtaStoryblok
    | ContactCtaItemStoryblok
    | ContentCtaStoryblok
    | ContentFloaterStoryblok
    | ContentFloaterFigureStoryblok
    | ContentFloaterFigureAnimatedStoryblok
    | ContentImageStoryblok
    | DividerStoryblok
    | FeatureStoryblok
    | FeaturesStoryblok
    | FooterBlokStoryblok
    | FooterLinkStoryblok
    | FullPageHeroStoryblok
    | GalleryStoryblok
    | GalleryCustomStoryblok
    | GalleryPanelStoryblok
    | GalleryPreviewStoryblok
    | GetInTouchStoryblok
    | GridStoryblok
    | HeaderBannerStoryblok
    | HeroStoryblok
    | HeroVideoStoryblok
    | HomeFeaturesStoryblok
    | HomeFeaturesPanelStoryblok
    | HomeModelStoryblok
    | HubSpotFormStoryblok
    | IconLinkStoryblok
    | IframeBlokStoryblok
    | ImageCardStoryblok
    | LayoutStoryblok
    | ModelStatStoryblok
    | NavBarStoryblok
    | NavBarDropdownStoryblok
    | NavBarDropdownLinkStoryblok
    | NavBarLinkStoryblok
    | NavBarMobileDisclosureStoryblok
    | NavBarMobileDisclosureLinkStoryblok
    | NavBarMobileLinkStoryblok
    | PageStoryblok
    | PictureContainerStoryblok
    | PopularArticlesStoryblok
    | PrimaryButtonStoryblok
    | PtrCallToActionStoryblok
    | PtrDiscoverWhyStoryblok
    | PtrHeaderStoryblok
    | PtrHeroStoryblok
    | SecondaryButtonStoryblok
    | SelectHomeModelStoryblok
    | StandardContainerStoryblok
    | StatDataStoryblok
    | TabsVerticleFloaterStoryblok
    | TabsVerticleFloaterTabStoryblok
    | TeaserStoryblok
    | TestimonialStoryblok
    | TestimonialSliderStoryblok
    | ThreeColumnStoryblok
    | TitleBlokStoryblok
    | YoutubeEmbedStoryblok
  )[];
  _uid: string;
  component: "layout";
  [k: string]: any;
}

export interface ModelStatStoryblok {
  icon?:
    | ""
    | "fluent:bed-20-regular"
    | "ph:bathtub-light"
    | "ph:ruler-light"
    | "ph:stairs-light"
    | "ph:toilet-light"
    | "ph:garage-light";
  value?: string;
  label?: string;
  _uid: string;
  component: "ModelStat";
  [k: string]: any;
}

export interface NavBarStoryblok {
  Desktop?: any;
  desktopNavigation?: (NavBarLinkStoryblok | NavBarDropdownStoryblok)[];
  desktopSocial?: IconLinkStoryblok[];
  Mobile?: any;
  mobileNavigation?: (NavBarMobileDisclosureStoryblok | NavBarMobileLinkStoryblok)[];
  mobileSocial?: IconLinkStoryblok[];
  _uid: string;
  component: "NavBar";
  [k: string]: any;
}

export interface NavBarDropdownStoryblok {
  text?: string;
  dropdown?: NavBarDropdownLinkStoryblok[];
  _uid: string;
  component: "NavBarDropdown";
  [k: string]: any;
}

export interface NavBarDropdownLinkStoryblok {
  text?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "NavBarDropdownLink";
  [k: string]: any;
}

export interface NavBarLinkStoryblok {
  text?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "NavBarLink";
  [k: string]: any;
}

export interface NavBarMobileDisclosureStoryblok {
  text?: string;
  panel?: NavBarMobileDisclosureLinkStoryblok[];
  _uid: string;
  component: "NavBarMobileDisclosure";
  [k: string]: any;
}

export interface NavBarMobileDisclosureLinkStoryblok {
  text?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "NavBarMobileDisclosureLink";
  [k: string]: any;
}

export interface NavBarMobileLinkStoryblok {
  text?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "NavBarMobileLink";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | ArticleCardStoryblok
    | BannerStoryblok
    | ButtonOutlineStoryblok
    | CalloutContainerStoryblok
    | CalloutItemStoryblok
    | ChipButtonStoryblok
    | ColumnTwoDividerStoryblok
    | ContactCtaStoryblok
    | ContactCtaItemStoryblok
    | ContentCtaStoryblok
    | ContentFloaterStoryblok
    | ContentFloaterFigureStoryblok
    | ContentFloaterFigureAnimatedStoryblok
    | ContentImageStoryblok
    | DividerStoryblok
    | FeatureStoryblok
    | FeaturesStoryblok
    | FooterBlokStoryblok
    | FooterLinkStoryblok
    | FullPageHeroStoryblok
    | GalleryStoryblok
    | GalleryCustomStoryblok
    | GalleryPanelStoryblok
    | GalleryPreviewStoryblok
    | GetInTouchStoryblok
    | GridStoryblok
    | HeaderBannerStoryblok
    | HeroStoryblok
    | HeroVideoStoryblok
    | HomeFeaturesStoryblok
    | HomeFeaturesPanelStoryblok
    | HomeModelStoryblok
    | HubSpotFormStoryblok
    | IconLinkStoryblok
    | IframeBlokStoryblok
    | ImageCardStoryblok
    | LayoutStoryblok
    | ModelStatStoryblok
    | NavBarStoryblok
    | NavBarDropdownStoryblok
    | NavBarDropdownLinkStoryblok
    | NavBarLinkStoryblok
    | NavBarMobileDisclosureStoryblok
    | NavBarMobileDisclosureLinkStoryblok
    | NavBarMobileLinkStoryblok
    | PageStoryblok
    | PictureContainerStoryblok
    | PopularArticlesStoryblok
    | PrimaryButtonStoryblok
    | PtrCallToActionStoryblok
    | PtrDiscoverWhyStoryblok
    | PtrHeaderStoryblok
    | PtrHeroStoryblok
    | SecondaryButtonStoryblok
    | SelectHomeModelStoryblok
    | StandardContainerStoryblok
    | StatDataStoryblok
    | TabsVerticleFloaterStoryblok
    | TabsVerticleFloaterTabStoryblok
    | TeaserStoryblok
    | TestimonialStoryblok
    | TestimonialSliderStoryblok
    | ThreeColumnStoryblok
    | TitleBlokStoryblok
    | YoutubeEmbedStoryblok
  )[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface PictureContainerStoryblok {
  image: AssetStoryblok;
  lazy: boolean;
  _uid: string;
  component: "PictureContainer";
  [k: string]: any;
}

export interface PopularArticlesStoryblok {
  headline?: string;
  articles?: (StoryblokStory<ArticleStoryblok> | string)[];
  _uid: string;
  component: "popular-articles";
  [k: string]: any;
}

export interface PrimaryButtonStoryblok {
  text?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "PrimaryButton";
  [k: string]: any;
}

export interface PtrCallToActionStoryblok {
  _uid: string;
  component: "PTRCallToAction";
  [k: string]: any;
}

export interface PtrDiscoverWhyStoryblok {
  googleImg: AssetStoryblok;
  slider?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | ArticleCardStoryblok
    | BannerStoryblok
    | ButtonOutlineStoryblok
    | CalloutContainerStoryblok
    | CalloutItemStoryblok
    | ChipButtonStoryblok
    | ColumnTwoDividerStoryblok
    | ContactCtaStoryblok
    | ContactCtaItemStoryblok
    | ContentCtaStoryblok
    | ContentFloaterStoryblok
    | ContentFloaterFigureStoryblok
    | ContentFloaterFigureAnimatedStoryblok
    | ContentImageStoryblok
    | DividerStoryblok
    | FeatureStoryblok
    | FeaturesStoryblok
    | FooterBlokStoryblok
    | FooterLinkStoryblok
    | FullPageHeroStoryblok
    | GalleryStoryblok
    | GalleryCustomStoryblok
    | GalleryPanelStoryblok
    | GalleryPreviewStoryblok
    | GetInTouchStoryblok
    | GridStoryblok
    | HeaderBannerStoryblok
    | HeroStoryblok
    | HeroVideoStoryblok
    | HomeFeaturesStoryblok
    | HomeFeaturesPanelStoryblok
    | HomeModelStoryblok
    | HubSpotFormStoryblok
    | IconLinkStoryblok
    | IframeBlokStoryblok
    | ImageCardStoryblok
    | LayoutStoryblok
    | ModelStatStoryblok
    | NavBarStoryblok
    | NavBarDropdownStoryblok
    | NavBarDropdownLinkStoryblok
    | NavBarLinkStoryblok
    | NavBarMobileDisclosureStoryblok
    | NavBarMobileDisclosureLinkStoryblok
    | NavBarMobileLinkStoryblok
    | PageStoryblok
    | PictureContainerStoryblok
    | PopularArticlesStoryblok
    | PrimaryButtonStoryblok
    | PtrCallToActionStoryblok
    | PtrDiscoverWhyStoryblok
    | PtrHeaderStoryblok
    | PtrHeroStoryblok
    | SecondaryButtonStoryblok
    | SelectHomeModelStoryblok
    | StandardContainerStoryblok
    | StatDataStoryblok
    | TabsVerticleFloaterStoryblok
    | TabsVerticleFloaterTabStoryblok
    | TeaserStoryblok
    | TestimonialStoryblok
    | TestimonialSliderStoryblok
    | ThreeColumnStoryblok
    | TitleBlokStoryblok
    | YoutubeEmbedStoryblok
  )[];
  _uid: string;
  component: "PTRDiscoverWhy";
  [k: string]: any;
}

export interface PtrHeaderStoryblok {
  _uid: string;
  component: "PTRHeader";
  [k: string]: any;
}

export interface PtrHeroStoryblok {
  _uid: string;
  component: "PTRHero";
  [k: string]: any;
}

export interface SecondaryButtonStoryblok {
  text?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  dark: boolean;
  _uid: string;
  component: "SecondaryButton";
  [k: string]: any;
}

export interface SelectHomeModelStoryblok {
  title?: string;
  homeModels?: (StoryblokStory<HomeModelStoryblok> | string)[];
  _uid: string;
  component: "SelectHomeModel";
  [k: string]: any;
}

export interface StandardContainerStoryblok {
  body?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | ArticleCardStoryblok
    | BannerStoryblok
    | ButtonOutlineStoryblok
    | CalloutContainerStoryblok
    | CalloutItemStoryblok
    | ChipButtonStoryblok
    | ColumnTwoDividerStoryblok
    | ContactCtaStoryblok
    | ContactCtaItemStoryblok
    | ContentCtaStoryblok
    | ContentFloaterStoryblok
    | ContentFloaterFigureStoryblok
    | ContentFloaterFigureAnimatedStoryblok
    | ContentImageStoryblok
    | DividerStoryblok
    | FeatureStoryblok
    | FeaturesStoryblok
    | FooterBlokStoryblok
    | FooterLinkStoryblok
    | FullPageHeroStoryblok
    | GalleryStoryblok
    | GalleryCustomStoryblok
    | GalleryPanelStoryblok
    | GalleryPreviewStoryblok
    | GetInTouchStoryblok
    | GridStoryblok
    | HeaderBannerStoryblok
    | HeroStoryblok
    | HeroVideoStoryblok
    | HomeFeaturesStoryblok
    | HomeFeaturesPanelStoryblok
    | HomeModelStoryblok
    | HubSpotFormStoryblok
    | IconLinkStoryblok
    | IframeBlokStoryblok
    | ImageCardStoryblok
    | LayoutStoryblok
    | ModelStatStoryblok
    | NavBarStoryblok
    | NavBarDropdownStoryblok
    | NavBarDropdownLinkStoryblok
    | NavBarLinkStoryblok
    | NavBarMobileDisclosureStoryblok
    | NavBarMobileDisclosureLinkStoryblok
    | NavBarMobileLinkStoryblok
    | PageStoryblok
    | PictureContainerStoryblok
    | PopularArticlesStoryblok
    | PrimaryButtonStoryblok
    | PtrCallToActionStoryblok
    | PtrDiscoverWhyStoryblok
    | PtrHeaderStoryblok
    | PtrHeroStoryblok
    | SecondaryButtonStoryblok
    | SelectHomeModelStoryblok
    | StandardContainerStoryblok
    | StatDataStoryblok
    | TabsVerticleFloaterStoryblok
    | TabsVerticleFloaterTabStoryblok
    | TeaserStoryblok
    | TestimonialStoryblok
    | TestimonialSliderStoryblok
    | ThreeColumnStoryblok
    | TitleBlokStoryblok
    | YoutubeEmbedStoryblok
  )[];
  _uid: string;
  component: "StandardContainer";
  [k: string]: any;
}

export interface StatDataStoryblok {
  name?: string;
  value?: string;
  _uid: string;
  component: "StatData";
  [k: string]: any;
}

export interface TabsVerticleFloaterStoryblok {
  title?: string;
  subtitle?: string;
  tabs?: TabsVerticleFloaterTabStoryblok[];
  _uid: string;
  component: "TabsVerticleFloater";
  [k: string]: any;
}

export interface TabsVerticleFloaterTabStoryblok {
  title?: string;
  content?: string;
  logo?: AssetStoryblok;
  image?: AssetStoryblok;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "TabsVerticleFloaterTab";
  [k: string]: any;
}

export interface TeaserStoryblok {
  headline?: string;
  _uid: string;
  component: "teaser";
  [k: string]: any;
}

export interface TestimonialStoryblok {
  name?: string;
  owed?: string;
  paid?: string;
  text?: string;
  youtube?: YoutubeEmbedStoryblok[];
  _uid: string;
  component: "Testimonial";
  [k: string]: any;
}

export interface TestimonialSliderStoryblok {
  testimonials?: TestimonialStoryblok[];
  _uid: string;
  component: "TestimonialSlider";
  [k: string]: any;
}

export interface ThreeColumnStoryblok {
  title?: string;
  description?: string;
  content?: (ImageCardStoryblok | ArticleCardStoryblok)[];
  _uid: string;
  component: "ThreeColumn";
  [k: string]: any;
}

export interface TitleBlokStoryblok {
  title?: string;
  subtitle1?: string;
  subtitle2?: string;
  _uid: string;
  component: "TitleBlok";
  [k: string]: any;
}

export interface YoutubeEmbedStoryblok {
  youtubeLink: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "YoutubeEmbed";
  [k: string]: any;
}
