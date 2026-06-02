export type BlogCategory = "Tutorials" | "Product Updates" | "Privacy" | "Efficiency";

export type BlogPost = {
  /** Unique slug for future individual post pages */
  slug: string;
  title: string;
  excerpt: string;
  /** SEO meta description for the post page */
  description: string;
  category: BlogCategory;
  /** Real image URL from design HTML */
  imageUrl: string;
  imageAlt: string;
};

/** Maps category to the Tailwind badge color classes used in BlogCard */
export const categoryBadgeClasses: Record<BlogCategory, string> = {
  Tutorials: "bg-primary text-on-primary",
  "Product Updates": "bg-primary text-on-primary",
  Privacy: "bg-secondary text-on-secondary",
  Efficiency: "bg-tertiary-container text-on-tertiary-container",
};

export const blogPosts: BlogPost[] = [
  {
    slug: "mastering-pdf-compression-without-loss",
    title: "Mastering PDF Compression Without Loss",
    excerpt:
      "Learn the advanced techniques to shrink your documents while maintaining crystal-clear resolution for professional use.",
    description:
      "Learn the advanced techniques to shrink your documents while maintaining crystal-clear resolution for professional use. Step-by-step PDF compression guide.",
    category: "Tutorials",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8PyvFvFMJL8eXRy-SV6hpJGlvX6gCbj-CVVBnSuONUoLNPFNwNkYpK5Np-V-LP-4rTFFniCMSaMbAI8Qmlrhsu35nWFlLMsjp4AVCvLb4alxpoEFBmFNk44CiPbgPMEgZWz_dzTzNzefT6RNlGrl3TpB_KX9lAFw7MCbJoe8qhZA3WXbFtLLPRAP9M0pnDD8LiCG69Kl_kUarmz2b3A9l78bp2huBXZ-s_cmNb83VDy0ZkKi3AZeWfSAwk88JqdIXqYBUst2dTblk",
    imageAlt:
      "A clean, minimalist digital workspace featuring an abstract, flowing neon blue light installation across a screen. The setting is a professional office with high-key soft lighting and a modern aesthetic. The color palette is dominated by cool whites and deep primary blues, conveying a sense of high-speed digital efficiency and professional clarity.",
  },
  {
    slug: "how-we-handle-your-sensitive-data",
    title: "How We Handle Your Sensitive Data",
    excerpt:
      "Privacy is at the core of Jamro. Explore our zero-log architecture and how your files stay truly yours.",
    description:
      "Privacy is at the core of Jamro. Explore our zero-log architecture and how your files stay truly yours. Read about our data-handling commitments.",
    category: "Privacy",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBflrk9xYIOPC6mKtUToQ5wj8bPYLV5ZmYGlupvk47EEhvWwUp9VHhTL2cyUUJAHjtYxORKWO5bgmBJ-qCsTVIRY-vF7VXPIE3wxdGHq4PSHG6Oh99oYPJynM7HSblB5igrceyo0gzY5xByzc9w5YgG58p63yW_lL62Zfm_zug-5CaEDxp_eZ5sSnWF3KJqr_yHfUtB_2v-38hDtQ8cSi_UcQ3QAVwJ0Q-sg0_ICMpVNNbOl5aFNWJG3y9pDlu1mJ7a3oF5TpD9lyMO",
    imageAlt:
      "An intricate close-up of a high-tech server room with glowing blue fiber optic cables weaving through sleek hardware panels. The atmosphere is tech-forward and clean, with a focus on data privacy and security. Lighting is dramatic yet professional, utilizing a primary blue and surface-white palette to emphasize technical reliability and digital safety.",
  },
  {
    slug: "batch-processing-save-hours-every-week",
    title: "Batch Processing: Save Hours Every Week",
    excerpt:
      "Stop converting one by one. Use Jamro's batch engine to process hundreds of images in seconds.",
    description:
      "Stop converting one by one. Use Jamro's batch engine to process hundreds of images in seconds and reclaim hours of your week.",
    category: "Efficiency",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaaAlLtQZqVKJK9jmjuqZSMOC5gE0kM23XqFJTsoLXAWrclp9sQsNUvCKh_4jZ3xkVvquZdY08ffuiyTcFLMyhAXgxHJg0QugfoUXhuWvMY82PXtZxYlrstCndRNctGlxTd0tTxBoBqX51DmtoFt7CB-GdEHoXlfODKun0aqfB9GZUsDLBujHc93DNcJVVQQynN_ZXivUg0QbIATHR5pX_FATIBoyKiypYG4vzy2Ctc1TEK0OU0e11UDmtFsdvN-eiqtwaKdpuq7tB",
    imageAlt:
      "A macro photograph of a glass prism refracting bright white light into sharp geometric patterns against a pristine white background. The image represents digital efficiency and the transformation of information. The lighting is bright and airy, reflecting a modern corporate brand identity with subtle gradients of sky blue and silver-toned shadows.",
  },
  {
    slug: "introducing-ocr-for-40-plus-languages",
    title: "Introducing OCR for 40+ Languages",
    excerpt:
      "Our latest update brings powerful Optical Character Recognition to every user, supporting diverse global scripts.",
    description:
      "Our latest update brings powerful Optical Character Recognition to every user, supporting diverse global scripts across 40+ languages.",
    category: "Product Updates",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlQcv_iw6SzqCy_ICrVspycqI8MuIDKhiVxqotHTg7d8M0BlB34mHbIzWSxnvbyi5yJX80tocyQoZWFpdAk_1MMqx2vbFmA993PVixfWnXvsrOhfRVl7XUN3qrGaaAxITvGBnivmJ09uFtV9qVLW4ZHBeHdlEUNiHZKg1bVFDPm5gEmAtFLbcSEGD4WSktuWuhDGxtw3tHDrOUw-K1wPw6hwlIwP8Knd0koVHElhaufbr8lhr84RbYKuThpZLG22Rkm1P_E9iLl_Sm",
    imageAlt:
      "A minimalist data visualization showing clean, blue glowing charts on a semi-transparent glass panel. The background is a soft, out-of-focus modern office environment. The scene is bright and professional, emphasizing clarity and information design. The aesthetic uses white, primary blue, and soft grey tones to create a premium utility tool feel.",
  },
  {
    slug: "svg-vs-png-which-is-right-for-you",
    title: "SVG vs PNG: Which is Right for You?",
    excerpt:
      "A comprehensive guide on vector vs raster formats and when to use Jamro's converter for each.",
    description:
      "A comprehensive guide on vector vs raster formats and when to use Jamro's converter for each. Pick the right image format for every use case.",
    category: "Tutorials",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArmDqIUEhh3chzvqNbCZfFFxUxn7tsTjTcKbn7ifvyHVQW_xLSXZ42LmUoHu00NyqDsXWDj8LKappKg3NW8AmnMG5ViyOCXusn8nTfe98Z98xt_VdNC1ZV7kzuXNktLea4OVneilkp_adSNPHN32d51vz_i9y9oKQjcmiFHu-dWIJkQd8HmHf3IjrwB6Q6p4m721_PoQEnW3mr5XMHilrkHQAalpejAgMTO0_q4Jc-On1Hj_Y0BUmDhSHkpD458Hj-t9zN_YRAgv-7",
    imageAlt:
      "A top-down view of a designer's desk featuring a high-resolution tablet showing vibrant blue and white interface wireframes. The lighting is natural and bright, suggesting a morning creative session. The design aesthetic is clean and corporate, featuring a palette of white and primary blues that matches the Swiss Army knife brand personality.",
  },
  {
    slug: "the-developers-guide-to-our-new-api",
    title: "The Developer's Guide to Our New API",
    excerpt:
      "Automate your workflow by integrating Jamro's conversion engine directly into your custom applications.",
    description:
      "Automate your workflow by integrating Jamro's conversion engine directly into your custom applications. Full developer walkthrough and code samples.",
    category: "Efficiency",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBx9t1BmY4n8LNwbPCYl9wmIeDSmiUMOuY__twpwIRWtqORvW5iAP-S9Nh82d5N5JTiUkjFqGVjFX2vjzC_5YIIm2GNmdFqOrlaQ8iQWefo1WdSlqIaToSYLaGc1XTn69c-qQMMfi8l4fXFCtJPKPohzg8sNMOS6mhChR73AgtO_23FimCdyuEx2Mz1TtGVVZJ3ECMoIzvUilkVv-6jXRa54gLbzfA9TZ8bfU96dx7OlZqJ4NMXvxW-r8q1x-V0x5jCkqmC8hgoc-33",
    imageAlt:
      "An abstract 3D render of a futuristic mechanical iris opening to reveal a bright blue light center. The texture is smooth, matte white plastic and polished silver. The overall look is efficient, precise, and multi-functional. The lighting is studio-quality, high-key, with soft shadows and a strong emphasis on the primary blue glowing core.",
  },
  {
    slug: "real-time-pdf-annotation-is-here",
    title: "Real-time PDF Annotation is Here",
    excerpt:
      "Collaborate with your team instantly. Add comments, highlights, and stamps in our new web editor.",
    description:
      "Collaborate with your team instantly. Add comments, highlights, and stamps in our new web editor. Real-time PDF annotation, explained.",
    category: "Product Updates",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjzTxZ6siCfqMeZatWU-64zw1FHrmafz7BfIw9sCz_X8nK1nZCIPUZkbFiwJvmGgsi274oCxKaD1hhl2vltntwPCwwcdbvGLLcK-I2LwC68YGMhQyKLQVZbd0_MvV82Y8d7auTDSD-ZpHPQVzNYZCQm_E-PzEfd7GeH-BFO7i_JCeguaRr77KRoeNrswg3Ms1ezvHY7rCkEV3HbUdmggAdnodG6jbr0MzsP_4Ahp4rrDVNk7jS3Sgwp0nwkMCUWkvRIPttLHaOSky_",
    imageAlt:
      "A modern collaborative space with bright windows and sleek glass tables. On one table, a laptop displays a professional PDF editing software interface with blue highlight colors. The lighting is vibrant and optimistic, symbolizing teamwork and digital collaboration. The style is clean, airy, and high-fidelity, using whites and primary blue accents.",
  },
  {
    slug: "optimizing-images-for-global-speed",
    title: "Optimizing Images for Global Speed",
    excerpt:
      "Reduce page load times by up to 80% using our smart WebP and Avif conversion tools.",
    description:
      "Reduce page load times by up to 80% using our smart WebP and Avif conversion tools. Image optimization for global delivery.",
    category: "Tutorials",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQaiLS0KTA5Pa86xWSCz14nYcdHVqen3NeFR8xZnrQdQRQelTUbKNMMz2MrNwJm12leM1m9RbphtMebJp69ZTPQZxRKVZWn6VieZOUKORUsK1TAtGmFruqc0NbAxU8-vB8uFKKlDeikGqqrKqs75trxAQI4qw3rXRLHN31-YNZh0m3MRVAH0_b1yOW5SsmOxyTmKJ1M3TrQl5XMGT-tlbUQw0oea3v40YKd8_g3QGwjcgknHQOAwTvdSDw7ThyBRuHtEpCmx7pTgN9",
    imageAlt:
      "A digital globe rendered in glowing blue lines and data points against a dark blue background, transitioning into a bright white space at the bottom. The mood is global and connected. The lighting emphasizes a high-tech, futuristic vision of data processing. The style is minimalist and high-contrast, featuring primary blue as the dominant accent color.",
  },
  {
    slug: "the-future-of-client-side-processing",
    title: "The Future of Client-Side Processing",
    excerpt:
      "We're moving more tools to run entirely in your browser, meaning your files never even hit our servers.",
    description:
      "We're moving more tools to run entirely in your browser, meaning your files never even hit our servers. The future of privacy-first processing.",
    category: "Privacy",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBI6LfOI_kFYJnYpJbtonsLs1EJ8tO2YXPq6eizcHGSKdztZj49sdymYbVYj9_cRm8mYLC5Ehrhafq3EqiWZ5_Q9HGZ-XKDtm3-RC8kzMUEV56lA_K5CVDvt6oeQkvADG5mLCVxmJao3RFet0zR8aTc6XJUx7Aq8tvD26ZQcPZtzi1PQQG5-OcjGqoFixE8df6Ww139kaL4TyT25cS9U0hF3qfy6RCGcT69X7q1t-J-ZH-zOY56HuZ7uIwXRhM4LbLWxGxZePzLbfE3",
    imageAlt:
      "Abstract vibrant blue gradients flowing like liquid silk on a pristine white background. The image is clean and minimalist, representing the fluid nature of digital file conversion. The lighting is soft and diffused, creating a bright and approachable modern corporate look. The primary blue color stands out with high saturation and professional depth.",
  },
  {
    slug: "top-10-chrome-extensions-for-productivity",
    title: "Top 10 Chrome Extensions for Productivity",
    excerpt:
      "Our curation of tools that work perfectly alongside Jamro to supercharge your daily digital tasks.",
    description:
      "Our curation of tools that work perfectly alongside Jamro to supercharge your daily digital tasks. The top 10 Chrome extensions for productivity.",
    category: "Efficiency",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMtSDno7AAcmF1jstVyMrpJX_bI1Ib96gwO_7unoTtxGh5-KNCFzkDd6tjmykDdJstg-J8GzYbIXox6w2IzAmbB1HPkDw4vmeO4FNQAU7JDsE3ddoKjvVR5zm8xUViWIJnM5qLnEo7ZEa2szzCcCzB7aZc9YQt2-BgqWSJS4UPpG1c5lwO2vutfEStnShYQ118hxN80_GD38pEemgobMvGY8crXKw5Tjvt1sJKkGZcQYl-nTOqYD4f0w2-q6Wnbb3ylRwcJcgt-vlN",
    imageAlt:
      "A silver laptop on a minimalist desk with a clean blue and white user interface displayed on screen. The room is flooded with bright, natural daylight. The composition is simple and professional, reflecting the utilitarian and approachable nature of Jamro Tools. The color palette is white, grey, and vibrant primary blue accents.",
  },
  {
    slug: "how-to-digitize-your-paper-archives",
    title: "How to Digitize Your Paper Archives",
    excerpt:
      "A step-by-step guide to scanning, enhancing, and organizing your physical documents with Jamro.",
    description:
      "A step-by-step guide to scanning, enhancing, and organizing your physical documents with Jamro. Bring paper archives into the digital age.",
    category: "Tutorials",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnO2WgvznSRvaFFhR4K5Ftbq5Qcx4eFO2SIZWHWz90S6faLyhL4COUR27DfMW2KKXIochHp1xFREd7ojk1qzlvpRUhsAv3ypyNXeMurSuc1SOxjdIbKZKhkLI8I5O725_zWCFYtG8fi06YAwZ89Qbi6PFhrhPku4QR6RerajBOY1o7ctphAK6rb7Wl3qTdys3PinnAJV3lPDFC8QlR2cP_OCHvlcmsVzPXxNZRhM4pifNqbFFfAKg-Myc-GES3au4yQHT6gStYdFcN",
    imageAlt:
      "Close-up of human hands typing on a sleek, silver keyboard with a digital overlay of blue binary code. The lighting is cool and professional, with a focus on human interaction with high-tech systems. The aesthetic is clean, modern, and high-fidelity, using whites and primary blue to symbolize efficient digital workflows.",
  },
  {
    slug: "enterprise-security-sso-and-mfa",
    title: "Enterprise Security: SSO and MFA",
    excerpt:
      "Bringing world-class security to teams of all sizes. Learn how to secure your organization's Jamro account.",
    description:
      "Bringing world-class security to teams of all sizes. Learn how to secure your organization's Jamro account with SSO and MFA.",
    category: "Product Updates",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaYxQntAirzyyotgi9xTZyBCesrUdfZWnM81c7_eDuwCx__sQklTz1itYk7IDMbp2jtH0Jk1WyyIbufBtyk2q8It-ZGHYuMTGDKkZXcxSuuKtPvQBAJ2kUP0DT6vFiLB2-U4vHy2pPXn5T0yhaRe7a38MxYeYhM4FqTf_QBKP3tQLiTaCyzO0FCpTGclhJNyEIZ6vk4n6739v1_DR_gBo5eOmujDpHAFBWDtgFnf-xNbNA5pn-CF2divxYVGeehshnqpIR8CZTbxUb",
    imageAlt:
      "An abstract visualization of a secure digital vault gate glowing with electric blue circuits. The surrounding environment is a clean, white minimalist space. The image conveys high-level security and technical precision. The lighting is bright and modern, utilizing a primary blue and white color scheme to align with a professional utility brand.",
  },
];