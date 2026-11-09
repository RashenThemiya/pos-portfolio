import { till, network, storyLabels, screenExamples } from './shared.js';
import { PHONE_NUMBER } from '../data/contact.js';

export const en = {
  till,
  network,
  "nav": {
    "brand": {"name": "PENTARIX", "product": "POS"},
    "label": "Sections",
    "links": ["Why POS", "How it works", "Features", "Screens", "Plans"],
    "languageLabel": "Language",
    "languages": {"en": "EN", "si": "සිං"},
    "demo": "Book a demo",
    "openMenu": "Open menu",
    "closeMenu": "Close menu",
    "mobileLabel": "Mobile sections"
  },
  "hero": {
    "label": "Pentarix POS",
    "eyebrow": "Point of Sale System",
    "heading": ["Every bill in seconds. ", {"tag": "em", "children": ["Every rupee accounted for."]}],
    "description": "Pentarix POS runs your counters, stock, promotions, customer credit and branch reports from one system. Built for supermarkets, retail shops and multi-branch stores in Sri Lanka.",
    "demo": "Book a free demo →",
    "screens": "See the screens",
    "facts": ["Barcode & scale barcode", "Split payments", "Multi-counter & branch"],
    "networkLabel": "Example network shown in the background",
    "live": "Live network view",
    "stats": [
      {"value": "5", "label": "Branches"},
      {"value": "15", "label": "Counters"},
      {"value": "3", "label": "Suppliers"},
      {"value": "1,284", "label": "Bills today"}
    ],
    "legend": [
      {"color": "#ff6b0f", "label": "Sales data"},
      {"color": "#22c38e", "label": "Stock & price updates"},
      {"color": "#a78bfa", "label": "Purchase orders"}
    ]
  },
  "ad": {
    "heading": ["Now, ", {"tag": "em", "children": ["one answer"]}, " to every counter problem!"],
    "subheading": [
      "Pentarix POS – the ",
      {"tag": "b", "children": ["smart POS"]},
      " that keeps every bill and every rupee in your shop under control."
    ],
    "problemLabel": "The problem",
    "solutionLabel": "The POS fix",
    "questionIcon": "✕",
    "answerIcon": "✓",
    "arrow": "→",
    "rows": [
      {"question": "Long queues at the counter?", "answer": "Bills in seconds"},
      {"question": "Cash never matches at day end?", "answer": "Every counter balanced"},
      {"question": "Find out too late that stock ran out?", "answer": "Live stock and expiry"},
      {"question": "Lose track of credit you gave?", "answer": "Customer accounts and credit"},
      {"question": "Discounts are a headache?", "answer": "Automatic promotions"}
    ],
    "close": ["Grow your shop with Pentarix POS, ", {"tag": "em", "children": ["starting today!"]}],
    "website": ["Visit: ", {"tag": "b", "children": ["pentarixlabs.com"]}],
    "phone": ["Call: ", {"tag": "b", "children": [PHONE_NUMBER]}],
    "brand": {"small": "PENTARIX", "strong": "POS", "em": "Point of Sale System"}
  },
  "adControls": {"label": "Ad language", "si": "සිංහල", "en": "English"},
  "why": {
    "title": "A bill book and a cash drawer stop working once the shop gets busy",
    "description": "These are the problems shop owners tell us about most, and what changes with Pentarix POS.",
    "columns": ["Without POS", "With Pentarix POS"],
    "items": [
      {
        "before": "Cashiers remember prices and add up bills by hand.",
        "after": "Scan the barcode and the price, promotion and total are filled in."
      },
      {
        "before": "The drawer never matches at closing and nobody knows why.",
        "after": "Each counter session records the opening float, withdrawals, expenses and the variance."
      },
      {
        "before": "You find out an item ran out or expired when a customer asks for it.",
        "after": "Batches, expiry dates and low stock show on one screen."
      },
      {
        "before": "Credit written in a notebook goes missing.",
        "after": "Every customer has a credit balance, payment history and loyalty points."
      },
      {
        "before": "Refunds on returns are guessed, often at the full price.",
        "after": "Returns are checked against the invoice, refunded at what was paid, and put back into stock."
      },
      {
        "before": "To see sales across branches you phone each one.",
        "after": "Today's sales, top products and alerts for every branch are on one dashboard."
      }
    ]
  },
  "story": {
    labels: storyLabels,
    "title": "From the supplier's lorry to head office",
    "description": "See stock arrive, sell across several counters, and every branch stay connected.",
    "sceneLabel": "Animation: a supplier lorry delivers stock to the store, staff fill the shelves, customers shop and pay at three counters with promotions applied, then sales sync to head office with the other branches and a low-stock purchase order goes back to the supplier",
    "currencyPrefix": "LKR ",
    "steps": [
      {"title": "Suppliers deliver stock", "description": "The lorry brings the order and a GRN adds it to stock."},
      {"title": "Stock goes on the shelf", "description": "Staff fill the shelves, with batch and expiry tracked."},
      {
        "title": "Customers shop, many counters",
        "description": "Customers pick their items and go to any open counter."
      },
      {
        "title": "Promotions and payment",
        "description": "Promotions apply, customers pay by card, cash or credit, and the receipt prints."
      },
      {
        "title": "Every branch syncs",
        "description": "Sales reach head office, and low stock sends a purchase order to the supplier."
      }
    ]
  },
  "features": {
    "title": "Everything inside Pentarix POS",
    "description": "Twelve modules in one system, from the counter to head office.",
    "paymentLabel": "Accepted at the counter:",
    "payments": ["Cash", "Card", "Bank transfer", "Cheque", "Customer credit", "Return voucher", "Loyalty points"],
    "groups": {
      "counter": {
        "title": "Checkout",
        "items": [
          [{"tag": "b", "children": ["Barcode, SKU and name search"]}, " with a touch-friendly cashier screen"],
          [{"tag": "b", "children": ["Scale barcodes"]}, " read weight or price from the label"],
          ["Sell by ", {"tag": "b", "children": ["pack or piece"]}, " with unit conversions and variants"],
          "Sales history, invoice search and order cancellation",
          "Part-paid bills with the balance carried on the order"
        ]
      },
      "cash": {
        "title": "Payments",
        "items": [
          [{"tag": "b", "children": ["Split one bill"]}, " across several payment methods"],
          "Cash, card, bank transfer and cheque",
          [{"tag": "b", "children": ["Credit sales"]}, " to a customer account"],
          ["Pay with a ", {"tag": "b", "children": ["return voucher"]}],
          "Payment-method mix reported per branch and counter"
        ]
      },
      "returns": {
        "title": "Sales returns",
        "items": [
          ["Return against the ", {"tag": "b", "children": ["original invoice"]}, ", line by line"],
          ["Refund at the ", {"tag": "b", "children": ["net price paid"]}, ", after promotions"],
          "Blocks returning more than was sold",
          "Unpaid amounts are reduced first; credit goes back to the account",
          ["Restock as ", {"tag": "b", "children": ["good or damaged"]}, ", in the right unit"]
        ]
      },
      "promotions": {
        "title": "Promotions",
        "items": [
          [{"tag": "b", "children": ["Item"]}, " percentage or fixed discounts"],
          [{"tag": "b", "children": ["Bill"]}, " percentage or fixed discounts"],
          [{"tag": "b", "children": ["Buy X get Y"]}, " rules"],
          ["Promotions on ", {"tag": "b", "children": ["specific batches"]}, ", such as near-expiry stock"],
          [{"tag": "b", "children": ["Promo codes"]}, " at the counter, with start and end dates"]
        ]
      },
      "customers": {
        "title": "Customers & loyalty",
        "items": [
          ["Customer accounts with ", {"tag": "b", "children": ["credit balance"]}, " and limits"],
          "Record payments against what is owed",
          [{"tag": "b", "children": ["Loyalty points"]}, ": set points per rupee, earn and redeem"],
          "Full balance and loyalty history per customer",
          "Customer engagement report per branch"
        ]
      },
      "payments": {
        "title": "Cash & counters",
        "items": [
          ["Set up ", {"tag": "b", "children": ["counters"]}, " per branch"],
          ["Open a session with an ", {"tag": "b", "children": ["opening float"]}, " and note count"],
          ["Record ", {"tag": "b", "children": ["withdrawals and expenses"]}, " during the day"],
          ["Close with a ", {"tag": "b", "children": ["denomination count"]}, " and variance"],
          [{"tag": "b", "children": ["Variance alerts"]}, " and counter performance reports"]
        ]
      },
      "stock": {
        "title": "Inventory",
        "items": [
          ["Stock per branch with ", {"tag": "b", "children": ["batches and expiry dates"]}],
          ["Stock adjustments and ", {"tag": "b", "children": ["stock counts"]}],
          [{"tag": "b", "children": ["Transfers"]}, " between branches"],
          "Full movement history for every item",
          [{"tag": "b", "children": ["Slow-moving"]}, " products and inventory health"]
        ]
      },
      "suppliers": {
        "title": "Purchasing & suppliers",
        "items": [
          "Suppliers with their item lists and prices",
          [{"tag": "b", "children": ["Purchase orders"]}, " and goods received (GRN)"],
          ["Supplier ", {"tag": "b", "children": ["payments and ledger"]}, ", with unpaid supplies"],
          [{"tag": "b", "children": ["Purchase returns"]}, " and supplier refunds"],
          "Spend, receiving and payment-exposure reports"
        ]
      },
      "branches": {
        "title": "Product catalogue",
        "items": [
          "Items with categories, sub-categories and brands",
          [{"tag": "b", "children": ["Units"]}, ", pack sizes and variants"],
          [{"tag": "b", "children": ["Tax rates"]}, " per item"],
          [{"tag": "b", "children": ["Bulk import"]}, " of the catalogue"],
          ["Price history and an ", {"tag": "b", "children": ["audit log"]}, " of every change"]
        ]
      },
      "reports": {
        "title": "Reports & dashboards",
        "items": [
          ["Branch dashboard: ", {"tag": "b", "children": ["today, this month"]}, " and trends"],
          "Top and slow-selling products, top promotions",
          "Returns, purchases and supplies analytics",
          "Items that need attention and notifications",
          [{"tag": "b", "children": ["Head-office view"]}, " comparing all branches"]
        ]
      },
      "local": {
        "title": "Multi-branch",
        "items": [
          "Run several branches from one account",
          "Each branch keeps its own stock, counters and settings",
          "Branch status and performance side by side",
          "Per-branch loyalty and scale-barcode settings"
        ]
      },
      "security": {
        "title": "Users & security",
        "items": [
          [{"tag": "b", "children": ["Roles and permissions"]}, ", from owner to cashier"],
          ["A separate ", {"tag": "b", "children": ["cashier login"]}, " for the counter"],
          "Manager authorisation for sensitive actions",
          "Audit log of who changed what, and when"
        ]
      }
    }
  },
  "screens": {
    ...screenExamples,
    "title": "Inside the product",
    "intro": "Screens shown with example data.",
    "tablistLabel": "Product screens",
    "tabs": {
      "till": "Counter screen",
      "dash": "Branch dashboard",
      "cash": "Cash session",
      "promo": "Promotions",
      "stock": "Stock & batches"
    },
    "captions": {
      "till": {
        "url": "Pentarix POS / Kandy branch / Counter 02 / Checkout",
        "title": "A bill in a few seconds",
        "description": "Scan items, let promotions apply, and split the payment across cash and card. The invoice number is issued the moment it is paid."
      },
      "dash": {
        "url": "Pentarix POS / Kandy branch / Overview",
        "title": "How the branch is doing today",
        "description": "Sales, bills, average bill value and returns for the day, with the week's trend and how customers paid."
      },
      "cash": {
        "url": "Pentarix POS / Kandy branch / Counter 02 / Close session",
        "title": "Close the counter with confidence",
        "description": "Count each note and coin, and the system compares it with the float, cash sales, withdrawals and expenses. Any difference is flagged for the manager."
      },
      "promo": {
        "url": "Pentarix POS / Kandy branch / Promotions",
        "title": "Run promotions without a calculator",
        "description": "Set up item, bill, buy-X-get-Y, batch and code promotions with dates. The counter applies them and tracks how often each one is used."
      },
      "stock": {
        "url": "Pentarix POS / Kandy branch / Stock / Batches",
        "title": "Sell it before it expires",
        "description": "Every batch carries its expiry date. See what is close to expiry, put a batch promotion on it, or send it back to the supplier."
      }
    }
  },
  "local": {
    "title": "Made for shops in Sri Lanka",
    "items": [
      {
        "title": "Rupees and our notes",
        "description": "Prices in LKR, and session counts from Rs. 5,000 notes down to coins."
      },
      {
        "title": "Weighed goods",
        "description": "Rice, dhal and vegetables sold by weight straight from the scale label."
      },
      {
        "title": "Replaces the credit book",
        "description": "Give regular customers credit and see the balance drop as they pay."
      },
      {"title": "Sinhala and English", "description": "Training and support for your staff in both languages."}
    ]
  },
  "plans": {
    "title": "A plan for the size of your shop",
    "description": "Every plan includes setup, staff training and support in Sinhala and English. Call us for pricing.",
    "note": "Not sure which plan fits? Call us for a free demo at your shop.",
    "items": [
      {
        "id": "single",
        "title": "Single shop",
        "description": "For a corner shop, pharmacy or small grocery with one counter.",
        "fit": "1 branch · 1 counter",
        "features": [
          "Checkout, scale barcode and returns",
          "Split payments and customer credit",
          "Stock, batches and expiry",
          "Promotions and loyalty points",
          "Daily sales reports"
        ],
        "cta": "Call us"
      },
      {
        "id": "supermarket",
        "tag": "Most popular",
        "title": "Supermarket",
        "description": "For busy stores with several counters and many suppliers.",
        "fit": "1 branch · multiple counters",
        "features": [
          "Everything in Single shop",
          "Counter sessions, cash counts and variance alerts",
          "Purchase orders, GRN and supplier payments",
          "Purchase returns and stock counts",
          "Full branch dashboard and analytics"
        ],
        "cta": "Call us"
      },
      {
        "id": "multi",
        "title": "Multi-branch",
        "description": "For chains with several branches and a head office.",
        "fit": "Many branches · many counters",
        "features": [
          "Everything in Supermarket",
          "Stock transfers between branches",
          "Head-office dashboard for all branches",
          "Branch-level roles and permissions",
          "Priority support and on-site training"
        ],
        "cta": "Call us"
      }
    ]
  },
  "contact": {
    "title": ["Make your counter ", {"tag": "em", "children": ["smarter today."]}],
    "websiteLabel": "Website",
    "website": "pentarixlabs.com",
    "phoneLabel": "Call",
    "phone": PHONE_NUMBER,
    "visit": "Visit pentarixlabs.com →",
    "features": "Browse features"
  },
  "footer": ["© 2026 Pentarix Labs · Point of Sale System", `pentarixlabs.com · ${PHONE_NUMBER}`]
};
