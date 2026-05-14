/** Site-wide contact and business details (Australian English). */

export const SITE_NAME = "Capital Recruitment Agency";

export const BUSINESS_ADDRESS = {
  line1: "Suite 5, Second Floor, 70 Moore Street",
  suburb: "Liverpool",
  state: "NSW",
  country: "Australia",
  full: "Suite 5, Second Floor, 70 Moore Street, Liverpool NSW Australia",
} as const;

export const EMAIL_ACCOUNTS = "accountreceivables@capitalrecruitment.com.au" as const;
export const EMAIL_HR = "hr@capitalrecruitment.com.au" as const;
export const EMAIL_PAUL = "paul@capitalrecruitment.com.au" as const;
/** Applications and resumes are directed here. */
export const EMAIL_APPLICATIONS = EMAIL_PAUL;

/** Phone not finalised — display as placeholder until confirmed. */
export const PHONE_DISPLAY = "Phone number coming soon" as const;

export const MAP_EMBED_QUERY = encodeURIComponent("70 Moore Street, Liverpool NSW 2170, Australia");
