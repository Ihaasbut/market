import deliveryIllustration from "@/shared/assets/images/category/groceries.webp";
export const ABOUT_IMAGES = {
    origins:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=720&q=82",
    warehouse:
        "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=720&q=82",
    tech: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=720&q=82",
    delivery: deliveryIllustration,
} as const;

export type AboutImageKey = keyof typeof ABOUT_IMAGES;

export type AboutContentBlock = {
    titleId?: string;
    title?: string;
    imageKey: AboutImageKey;
    reverse: boolean;
    paragraphs: readonly string[];
};

export const ABOUT_LEAD =
    "Northline Market began as a cramped tech corner in a shared warehouse — today we ship electronics, home goods, apparel, and vehicle accessories to shoppers who expect honest listings and predictable delivery. We keep assortment deliberately broad enough for weekly errands yet narrow enough that every SKU earns its shelf slot through steady sell-through and verified specs.";

export const ABOUT_BLOCKS: AboutContentBlock[] = [
    {
        titleId: "about-block-1",
        title: "Where we started",
        imageKey: "origins",
        reverse: false,
        paragraphs: [
            "In 2019 two former retail buyers pooled savings to buy refurbished laptops and spare smartphone parts. Word spread through small repair shops; within a year we formalised as Northline Market LLC and opened fulfilment in Newark with six packing benches and one borrowed forklift.",
            "Early customers cared less about glossy branding than whether chargers matched listings — so we photographed serial bands, tested batteries, and refused gray-market adapters even when margins screamed yes.",
            "We never aimed to list everything — only categories we could photograph honestly and pack without surprises; that rule still governs every onboarding conversation with new vendors.",
        ],
    },
    {
        titleId: "about-block-2",
        title: "How we operate",
        imageKey: "warehouse",
        reverse: true,
        paragraphs: [
            "Orders route through two regional hubs: dry goods and textiles leave Atlanta after humidity checks; fragile electronics and glass depart from Newark after QA scans and anti-static bag swaps. Peak-season temps rotate shifts so picking slips never age overnight in staging cages.",
            "Vendor partners sign straightforward SLA sheets — stock sync twice daily via structured feeds, partial refunds disabled unless logistics confirms damage photos, and returns routed through the same portal shoppers see so nobody argues over divergent ticket IDs.",
            "Sustainability targets stay modest: cardboard reuse lanes, pallet pooling with nearby grocers, and quarterly audits that fire vendors who quietly swap factories without telling compliance.",
        ],
    },
    {
        titleId: "about-block-3",
        title: "What we sell",
        imageKey: "tech",
        reverse: false,
        paragraphs: [
            "Catalog breadth mirrors everyday trips — laptops and tablets, headphones, kitchen tools, wardrobe basics, sunglasses, car-care kits, modest jewellery lines when metallurgy certs hold up. Buyers browse unified search with specs surfaced wherever vendors supply structured attributes instead of PDF dumps.",
            "Marketplace slots rotate quarterly: slow movers earn two warning cycles before delisting, freeing warehouse bins for categories with sharper velocity such as USB-C hubs or insulated bottles during commuter-heavy quarters.",
            "Editorial blurbs are written in-house; we refuse vendor-supplied keyword stuffing even when SEO consultants threaten rankings — if a blender sounds identical to nine rivals, the listing states torque curves instead of superlatives.",
        ],
    },
    {
        titleId: "about-block-4",
        title: "Promises we keep",
        imageKey: "delivery",
        reverse: true,
        paragraphs: [
            "Transparent ETAs at checkout, consolidated invoices for small businesses, and wholesale desks that reply within two business days — not boilerplate; we track median response times weekly and publish anonymised cohort charts during holiday readiness drills.",
            "Carrier integrations reroute automatically when snowstorms stack up near Newark; shoppers receive terse SMS updates linking to maps, not legal disclaimers nobody reads after midnight coupon drops.",
            "Northline Market remains privately held — no billboard campaigns or stadium naming deals; growth funds better packaging, spare parts buffers, and tuition reimbursements for floor leads rotating through analytics rotations upstairs.",
        ],
    },
];
