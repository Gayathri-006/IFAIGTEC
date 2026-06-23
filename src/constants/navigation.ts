export interface NavItemSub {
  name: string;
}

export interface NavItemSection {
  title?: string;
  items: NavItemSub[];
}

export interface NavItem {
  label: string;
  sections: NavItemSection[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "About Us",
    sections: [
      {
        items: [
          { name: "About IFAIGTEC" },
          { name: "Vision" },
          { name: "Mission" },
          { name: "Values" },
          { name: "Activities" }
        ]
      }
    ]
  },
  {
    label: "Governance",
    sections: [
      {
        title: "OVERVIEW",
        items: [
          { name: "Administration" },
          { name: "Operations" },
          { name: "Management" },
          { name: "Governance/Reporting" }
        ]
      },
      {
        title: "CONSTITUTION",
        items: [
          { name: "Statutes - Rules" },
          { name: "Guidelines" },
          { name: "Policies" },
          { name: "Standards" }
        ]
      },
      {
        title: "KEY DECISIONS",
        items: [
          { name: "Annual General Meeting" },
          { name: "Council" }
        ]
      },
      {
        title: "GOVERNANCE RESOURCES",
        items: []
      }
    ]
  },
  {
    label: "Policies",
    sections: [
      {
        title: "SCOPE",
        items: [
          { name: "Scope" },
          { name: "Development" },
          { name: "Governance" },
          { name: "Members" },
          { name: "Confederation" },
          { name: "Product" },
          { name: "Projects" },
          { name: "Services" },
          { name: "Portfolios" }
        ]
      },
      {
        title: "STATUTES",
        items: [
          { name: "Governance" },
          { name: "Rules" },
          { name: "Judicial Process" },
          { name: "Technical Regulations" },
          { name: "Projects" },
          { name: "Products" },
          { name: "Services" },
          { name: "Portfolios" },
          { name: "Product Bundling" },
          { name: "Solution Bundling" }
        ]
      }
    ]
  },
  {
    label: "Members",
    sections: [
      {
        title: "MEMBERS",
        items: [
          { name: "IFAIGTEC India" },
          { name: "IFAIGTEC Malaysia" },
          { name: "IFAIGTEC USA" }
        ]
      },
      {
        title: "ASSOCIATE MEMBERS",
        items: []
      },
      {
        title: "CONFEDERATIONS",
        items: [
          { name: "Asia IFAIGTEC" },
          { name: "Africa IFAIGTEC" },
          { name: "Europe IFAIGTEC" },
          { name: "PanAm IFAIGTEC" },
          { name: "Oceania IFAIGTEC" }
        ]
      }
    ]
  },
  {
    label: "Council",
    sections: [
      {
        title: "COUNCIL",
        items: [
          { name: "President" },
          { name: "Dy.President" },
          { name: "Vice President - Asia" },
          { name: "Vice President - PanAm" },
          { name: "Vice President - Europe" },
          { name: "Vice President - Oceania" },
          { name: "Vice President - Africa" }
        ]
      },
      {
        title: "EXECUTIVE BOARD",
        items: []
      }
    ]
  },
  {
    label: "Committees",
    sections: [
      {
        title: "COMMITTEES",
        items: [
          { name: "Artificial Intelligence" },
          { name: "Data Science" },
          { name: "GRC" },
          { name: "Education" },
          { name: "Agriculture" },
          { name: "Technology" },
          { name: "Healthcare" },
          { name: "Cybersecurity" },
          { name: "Industries" },
          { name: "Retail" },
          { name: "Food" },
          { name: "Manufacturing" },
          { name: "Banking" },
          { name: "Insurance" },
          { name: "Skill Development" },
          { name: "Sports" }
        ]
      },
      {
        title: "COMMISSIONS",
        items: [
          { name: "Certifications" },
          { name: "DPDP Act" },
          { name: "NIST RMF" },
          { name: "EU AI Act" }
        ]
      },
      {
        title: "LEADERSHIP (CHAIRS)",
        items: [
          { name: "AI Chair & Co-Chair" },
          { name: "Governance Chair & Co-Chair" },
          { name: "Technology Chair & Co-Chair" },
          { name: "Education Chair & Co-Chair" },
          { name: "Cybersecurity Chair & Co-Chair" }
        ]
      }
    ]
  },
  {
    label: "Events",
    sections: [
      {
        title: "WORLD EVENTS",
        items: [
          { name: "World Seminars" },
          { name: "World Webinars" },
          { name: "World Workshops" },
          { name: "World Summits" },
          { name: "World Conclave" },
          { name: "World Conference" }
        ]
      },
      {
        title: "NATIONAL EVENTS",
        items: [
          { name: "National Seminars" },
          { name: "National Webinars" },
          { name: "National Workshops" },
          { name: "National Summits" },
          { name: "National Conference" }
        ]
      }
    ]
  },
  {
    label: "Certifications",
    sections: [
      {
        title: "CERTIFICATIONS",
        items: [
          { name: "Product Approvals" },
          { name: "Project Approvals" },
          { name: "Services Approvals" }
        ]
      },
      {
        title: "AFFILIATIONS",
        items: [
          { name: "Global Affiliations" }
        ]
      },
      {
        title: "ACCREDITATION & ASSESSMENT",
        items: [
          { name: "Institutional Accreditation" },
          { name: "Compliance Assessment" }
        ]
      }
    ]
  },
  {
    label: "Support",
    sections: [
      {
        title: "SUPPORT",
        items: [
          { name: "Contact Us" },
          { name: "FAQ" },
          { name: "Returns and Refunds" },
          { name: "Shipping and Delivery" },
          { name: "Terms and Conditions" },
          { name: "Privacy Policy" }
        ]
      },
      {
        title: "ACCOUNT",
        items: [
          { name: "My Account" },
          { name: "My Wishlist" },
          { name: "My Cart" },
          { name: "Register" },
          { name: "Track Your Order" },
          { name: "Login" }
        ]
      }
    ]
  }
];
