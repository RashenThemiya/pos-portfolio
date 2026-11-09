import { till, network, storyLabels, screenExamples } from './shared.js';
import { PHONE_NUMBER } from '../data/contact.js';

export const si = {
  till,
  network,
  "nav": {
    "brand": {"name": "PENTARIX", "product": "POS"},
    "label": "Sections",
    "links": ["ඇයි POS", "ක්‍රියා කරන හැටි", "විශේෂාංග", "තිර", "පැකේජ"],
    "languageLabel": "Language",
    "languages": {"en": "EN", "si": "සිං"},
    "demo": "ඩෙමෝ එකක්",
    "openMenu": "Open menu",
    "closeMenu": "Close menu",
    "mobileLabel": "Mobile sections"
  },
  "hero": {
    "label": "Pentarix POS",
    "eyebrow": "විකුණුම් ස්ථාන පද්ධතිය",
    "heading": ["බිල තත්පර කිහිපයකින්. ", {"tag": "em", "children": ["දවස අවසානයේ සල්ලි ගැලපෙනවා."]}],
    "description": "Pentarix POS ඔබේ කවුන්ටරය, තොග, promotions, පාරිභෝගික ණය සහ ශාඛා වාර්තා එක තැනකින් පාලනය කරයි. සුපර් මාර්කට්, සිල්ලර කඩ සහ බහු ශාඛා ව්‍යාපාර සඳහා.",
    "demo": "නොමිලේ ඩෙමෝ එකක් →",
    "screens": "තිර බලන්න",
    "facts": ["බාර්කෝඩ් සහ තරාදි බාර්කෝඩ්", "කොටස් ගෙවීම්", "බහු කවුන්ටර් සහ ශාඛා"],
    "networkLabel": "Example network shown in the background",
    "live": "සජීවී ජාල දසුන",
    "stats": [
      {"value": "5", "label": "ශාඛා"},
      {"value": "15", "label": "කවුන්ටර්"},
      {"value": "3", "label": "සැපයුම්කරුවන්"},
      {"value": "1,284", "label": "අද බිල්"}
    ],
    "legend": [
      {"color": "#ff6b0f", "label": "විකුණුම් දත්ත"},
      {"color": "#22c38e", "label": "තොග සහ මිල යාවත්කාලීන"},
      {"color": "#a78bfa", "label": "සැපයුම්කරුට ඇණවුම්"}
    ]
  },
  "ad": {
    "heading": ["කවුන්ටරයේ හැම ප්‍රශ්නයකටම ", {"tag": "em", "children": ["එකම විසඳුමක්!"]}],
    "subheading": ["Pentarix POS – ඔබේ කඩේ හැම බිලක්ම, හැම රුපියලක්ම පාලනය කරන ", {"tag": "b", "children": ["Smart POS"]}, " එක."],
    "problemLabel": "ප්‍රශ්නය",
    "solutionLabel": "POS විසඳුම",
    "questionIcon": "✕",
    "answerIcon": "✓",
    "arrow": "→",
    "rows": [
      {"question": "කවුන්ටරයේ පෝලිම් දිගද?", "answer": "බිල තත්පර කිහිපයකින්"},
      {"question": "දවස අවසානයේ සල්ලි ගැලපෙන්නේ නැද්ද?", "answer": "කවුන්ටර් මුදල් නිවැරදිව"},
      {"question": "Stock ඉවර වුණා දැනගන්නේ පස්සෙද?", "answer": "සජීවී තොග සහ කල් ඉකුත්වීම්"},
      {"question": "ණයට දුන්නා මතක නැද්ද?", "answer": "පාරිභෝගික ගිණුම් සහ ණය"},
      {"question": "Discount දාන්න අමාරුද?", "answer": "ස්වයංක්‍රීය promotions"}
    ],
    "close": ["Pentarix POS සමඟ ඔබේ කඩේ ", {"tag": "em", "children": ["අදම දියුණු කරගන්න!"]}],
    "website": ["වෙබ්: ", {"tag": "b", "children": ["pentarixlabs.com"]}],
    "phone": ["අමතන්න: ", {"tag": "b", "children": [PHONE_NUMBER]}],
    "brand": {"small": "PENTARIX", "strong": "POS", "em": "Point of Sale System"}
  },
  "adControls": {"label": "Ad language", "si": "සිංහල", "en": "English"},
  "why": {
    "title": "අතින් ලියන බිල් පොත සහ සාමාන්‍ය cash register ව්‍යාපාරය වැඩෙනකොට නවතිනවා",
    "description": "කඩ හිමියන් අපට වැඩිපුරම කියන ගැටලු මේවායි, සහ Pentarix POS සමඟ වෙනස් වන දේ.",
    "columns": ["POS නැතුව", "Pentarix POS එක්ක"],
    "items": [
      {
        "before": "හැම භාණ්ඩයකම මිල මතක තියාගෙන අතින් ගණන් හදනවා.",
        "after": "බාර්කෝඩ් එක ස්කෑන් කළාම මිල, promotion සහ මුළු එකතුව ස්වයංක්‍රීයව."
      },
      {
        "before": "දවස අවසානයේ ලාච්චුවේ සල්ලි ගැලපෙන්නේ නෑ, ඇයි කියලා කවුරුත් දන්නේ නෑ.",
        "after": "හැම කවුන්ටර් සැසියකටම ආරම්භක මුදල, ආපසු ගැනීම්, වියදම් සහ වෙනස සටහන් වෙනවා."
      },
      {
        "before": "භාණ්ඩ ඉවර වුණා හෝ කල් ඉකුත් වුණා දැනගන්නේ පාරිභෝගිකයා ඉල්ලුවාමයි.",
        "after": "බැච්, කල් ඉකුත් දින සහ අඩු තොග එක තිරයකින් බලන්න පුළුවන්."
      },
      {
        "before": "ණය පොතේ ලියපු ගණන් නැති වෙනවා.",
        "after": "හැම පාරිභෝගිකයෙකුගේම ණය ශේෂය, ගෙවීම් සහ ලෝයල්ටි පොයින්ට් සටහන් වෙනවා."
      },
      {
        "before": "රිටර්න් එකකට කීයක් ආපසු දෙන්නද කියලා තීරණය කරන්නේ අනුමානයෙන්.",
        "after": "රිටර්න් ඉන්වොයිසියට එරෙහිව, ගෙවූ මුදල අනුව ගණනය කර, තොගයට එකතු වෙනවා."
      },
      {
        "before": "ශාඛා කිහිපයක විකුණුම් බලන්න හැම තැනටම කෝල් කරන්න ඕනේ.",
        "after": "සියලු ශාඛාවල අද විකුණුම්, ලාභ සහ අනතුරු ඇඟවීම් එක ඩෑෂ්බෝඩ් එකක."
      }
    ]
  },
  "story": {
    labels: storyLabels,
    "title": "සැපයුම්කරුගේ ලොරියේ සිට ප්‍රධාන කාර්යාලය දක්වා",
    "description": "තොග එන හැටි, කවුන්ටර් ගණනාවක විකිණෙන හැටි, සහ සියලු ශාඛා එකට සම්බන්ධ වෙන හැටි බලන්න.",
    "sceneLabel": "Animation: a supplier lorry delivers stock to the store, staff fill the shelves, customers shop and pay at three counters with promotions applied, then sales sync to head office with the other branches and a low-stock purchase order goes back to the supplier",
    "currencyPrefix": "LKR ",
    "steps": [
      {"title": "සැපයුම්කරුවන් තොග ගෙනෙනවා", "description": "ලොරිය බඩු ගෙනෙනවා, GRN එකෙන් තොගය එකතු වෙනවා."},
      {"title": "රාක්කවලට තොග", "description": "කාර්ය මණ්ඩලය රාක්ක පුරවනවා, බැච් සහ කල් ඉකුත් දින සමඟ."},
      {"title": "කවුන්ටර් ගණනාවක", "description": "පාරිභෝගිකයන් බඩු තෝරා ඕනෑම කවුන්ටරයකට යනවා."},
      {"title": "Promotion සහ ගෙවීම", "description": "Promotions ස්වයංක්‍රීයව, කාඩ්, මුදල් හෝ ණය, බිල මුද්‍රණය වෙනවා."},
      {"title": "සියලු ශාඛා එකට", "description": "විකුණුම් ප්‍රධාන කාර්යාලයට, අඩු තොගයට ඇණවුම සැපයුම්කරුට."}
    ]
  },
  "features": {
    "title": "Pentarix POS ඇතුළේ තියෙන හැම දෙයක්ම",
    "description": "කවුන්ටරයේ සිට ප්‍රධාන කාර්යාලය දක්වා, එකම පද්ධතියක මොඩියුල 12ක්.",
    "paymentLabel": "භාරගන්නා ගෙවීම්:",
    "payments": ["Cash", "Card", "Bank transfer", "Cheque", "Customer credit", "Return voucher", "Loyalty points"],
    "groups": {
      "counter": {
        "title": "කවුන්ටර් විකිණීම",
        "items": [
          [{"tag": "b", "children": ["Barcode, SKU and name search"]}, " with a touch-friendly cashier screen"],
          [{"tag": "b", "children": ["Scale barcodes"]}, " read weight or price from the label"],
          ["Sell by ", {"tag": "b", "children": ["pack or piece"]}, " with unit conversions and variants"],
          "Sales history, invoice search and order cancellation",
          "Part-paid bills with the balance carried on the order"
        ]
      },
      "cash": {
        "title": "ගෙවීම්",
        "items": [
          [{"tag": "b", "children": ["Split one bill"]}, " across several payment methods"],
          "Cash, card, bank transfer and cheque",
          [{"tag": "b", "children": ["Credit sales"]}, " to a customer account"],
          ["Pay with a ", {"tag": "b", "children": ["return voucher"]}],
          "Payment-method mix reported per branch and counter"
        ]
      },
      "returns": {
        "title": "විකුණුම් රිටර්න්",
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
        "title": "පාරිභෝගිකයන්",
        "items": [
          ["Customer accounts with ", {"tag": "b", "children": ["credit balance"]}, " and limits"],
          "Record payments against what is owed",
          [{"tag": "b", "children": ["Loyalty points"]}, ": set points per rupee, earn and redeem"],
          "Full balance and loyalty history per customer",
          "Customer engagement report per branch"
        ]
      },
      "payments": {
        "title": "මුදල් සහ කවුන්ටර්",
        "items": [
          ["Set up ", {"tag": "b", "children": ["counters"]}, " per branch"],
          ["Open a session with an ", {"tag": "b", "children": ["opening float"]}, " and note count"],
          ["Record ", {"tag": "b", "children": ["withdrawals and expenses"]}, " during the day"],
          ["Close with a ", {"tag": "b", "children": ["denomination count"]}, " and variance"],
          [{"tag": "b", "children": ["Variance alerts"]}, " and counter performance reports"]
        ]
      },
      "stock": {
        "title": "තොග",
        "items": [
          ["Stock per branch with ", {"tag": "b", "children": ["batches and expiry dates"]}],
          ["Stock adjustments and ", {"tag": "b", "children": ["stock counts"]}],
          [{"tag": "b", "children": ["Transfers"]}, " between branches"],
          "Full movement history for every item",
          [{"tag": "b", "children": ["Slow-moving"]}, " products and inventory health"]
        ]
      },
      "suppliers": {
        "title": "මිලදී ගැනීම්",
        "items": [
          "Suppliers with their item lists and prices",
          [{"tag": "b", "children": ["Purchase orders"]}, " and goods received (GRN)"],
          ["Supplier ", {"tag": "b", "children": ["payments and ledger"]}, ", with unpaid supplies"],
          [{"tag": "b", "children": ["Purchase returns"]}, " and supplier refunds"],
          "Spend, receiving and payment-exposure reports"
        ]
      },
      "branches": {
        "title": "භාණ්ඩ නාමාවලිය",
        "items": [
          "Items with categories, sub-categories and brands",
          [{"tag": "b", "children": ["Units"]}, ", pack sizes and variants"],
          [{"tag": "b", "children": ["Tax rates"]}, " per item"],
          [{"tag": "b", "children": ["Bulk import"]}, " of the catalogue"],
          ["Price history and an ", {"tag": "b", "children": ["audit log"]}, " of every change"]
        ]
      },
      "reports": {
        "title": "වාර්තා",
        "items": [
          ["Branch dashboard: ", {"tag": "b", "children": ["today, this month"]}, " and trends"],
          "Top and slow-selling products, top promotions",
          "Returns, purchases and supplies analytics",
          "Items that need attention and notifications",
          [{"tag": "b", "children": ["Head-office view"]}, " comparing all branches"]
        ]
      },
      "local": {
        "title": "බහු ශාඛා",
        "items": [
          "Run several branches from one account",
          "Each branch keeps its own stock, counters and settings",
          "Branch status and performance side by side",
          "Per-branch loyalty and scale-barcode settings"
        ]
      },
      "security": {
        "title": "පරිශීලකයන් සහ ආරක්ෂාව",
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
    "title": "පද්ධතිය ඇතුළත",
    "intro": "උදාහරණ දත්ත සහිත තිර.",
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
        "title": "තත්පර කිහිපයකින් බිලක්",
        "description": "භාණ්ඩ ස්කෑන් කරන්න, promotions ස්වයංක්‍රීයව යෙදෙනවා, ගෙවීම මුදල් සහ කාඩ් අතර බෙදන්න. ගෙවූ සැණින් ඉන්වොයිස් අංකය නිකුත් වෙනවා."
      },
      "dash": {
        "url": "Pentarix POS / Kandy branch / Overview",
        "title": "අද ශාඛාව කොහොමද",
        "description": "දවසේ විකුණුම්, බිල් ගණන, සාමාන්‍ය බිල සහ රිටර්න්, සතියේ ප්‍රවණතාව සහ ගෙවීම් ක්‍රම සමඟ."
      },
      "cash": {
        "url": "Pentarix POS / Kandy branch / Counter 02 / Close session",
        "title": "විශ්වාසයෙන් කවුන්ටරය වසන්න",
        "description": "හැම නෝට්ටුවක්ම ගණන් කරන්න. පද්ධතිය එය ආරම්භක මුදල, මුදල් විකුණුම්, ආපසු ගැනීම් සහ වියදම් සමඟ සසඳා වෙනස කළමනාකරුට පෙන්වනවා."
      },
      "promo": {
        "url": "Pentarix POS / Kandy branch / Promotions",
        "title": "ගණක යන්ත්‍රයක් නැතුව promotions",
        "description": "භාණ්ඩ, බිල්, Buy X get Y, බැච් සහ කේත promotions දින සමඟ සකසන්න. කවුන්ටරය ඒවා යොදා භාවිතය ට්‍රැක් කරනවා."
      },
      "stock": {
        "url": "Pentarix POS / Kandy branch / Stock / Batches",
        "title": "කල් ඉකුත් වෙන්න කලින් විකුණන්න",
        "description": "හැම බැච් එකකටම කල් ඉකුත් දිනය තියෙනවා. ළඟ එන ඒවා බලා බැච් promotion එකක් දාන්න, නැත්නම් සැපයුම්කරුට ආපසු යවන්න."
      }
    }
  },
  "local": {
    "title": "ශ්‍රී ලංකාවේ කඩ සඳහාම හදපු",
    "items": [
      {"title": "රුපියල් සහ නෝට්ටු", "description": "LKR මිල, සහ රු. 5,000 සිට කාසි දක්වා සැසි ගණන් කිරීම."},
      {"title": "තරාදි බාර්කෝඩ්", "description": "සහල්, පරිප්පු, එළවළු වැනි කිරා විකුණන භාණ්ඩ තරාදි ලේබලයෙන්."},
      {"title": "ණය පොත වෙනුවට", "description": "හැඳින්න පාරිභෝගිකයන්ට ණයට දෙන්න, ගෙවූ විට ශේෂය අඩු වෙනවා."},
      {"title": "සිංහල සහ ඉංග්‍රීසි", "description": "ඔබේ කාර්ය මණ්ඩලයට සහාය සහ පුහුණුව දෙභාෂාවෙන්ම."}
    ]
  },
  "plans": {
    "title": "ඔබේ කඩේට ගැලපෙන පැකේජය",
    "description": "සෑම පැකේජයකටම ස්ථාපනය, පුහුණුව සහ දෙභාෂා සහාය ඇතුළත්. මිල ගණන් සඳහා අප අමතන්න.",
    "note": "ඔබේ ව්‍යාපාරයට ගැලපෙන්නේ කුමක්දැයි විශ්වාස නැද්ද? නොමිලේ ඩෙමෝ එකක් සඳහා අමතන්න.",
    "items": [
      {
        "id": "single",
        "title": "තනි කඩ",
        "description": "එක කවුන්ටරයක් සහිත සිල්ලර කඩ, ෆාමසි සහ කුඩා සුපර් මාර්කට්.",
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
        "tag": "වැඩිපුරම තෝරන",
        "title": "සුපර් මාර්කට්",
        "description": "කවුන්ටර් කිහිපයක් සහ සැපයුම්කරුවන් රැසක් ඇති කඩ.",
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
        "title": "බහු ශාඛා",
        "description": "ශාඛා කිහිපයක් සහ ප්‍රධාන කාර්යාලයක් ඇති ව්‍යාපාර.",
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
    "title": ["ඔබේ කවුන්ටරය ", {"tag": "em", "children": ["අදම ස්මාර්ට් කරන්න."]}],
    "websiteLabel": "වෙබ් අඩවිය",
    "website": "pentarixlabs.com",
    "phoneLabel": "අමතන්න",
    "phone": PHONE_NUMBER,
    "visit": "pentarixlabs.com වෙත යන්න →",
    "features": "විශේෂාංග බලන්න"
  },
  "footer": ["© 2026 Pentarix Labs · Point of Sale System", `pentarixlabs.com · ${PHONE_NUMBER}`]
};
