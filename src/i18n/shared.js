export const till = {
  "label": "Example checkout on the Pentarix POS counter screen",
  "counter": "Counter 02",
  "branchCashier": " · Kandy branch · Cashier: Nimali",
  "session": "Session open",
  "scan": "Scan or type name / SKU",
  "subtotal": "Subtotal",
  "promotions": "Promotions",
  "total": "Total LKR",
  "paid": "Paid: Cash 2,000.00 + Card 464.00",
  "invoice": "INV-K02-04187",
  "promoPrefix": "✓ ",
  "payments": ["Cash", "Card", "Bank transfer", "Cheque", "Credit", "Return voucher"],
  "items": {
    "milk": {"name": "Milk powder 400g", "sub": "1 × 1,190.00"},
    "soap": {"name": "Laundry soap 110g", "sub": "3 × 95.00", "promotion": "Buy 2 get 1"},
    "rice": {"name": "Samba rice · weighed", "sub": "2.350 kg × 240.00"},
    "crackers": {"name": "Cream crackers 490g", "sub": "2 × 260.00"}
  }
};

export const network = {
  "branches": ["Colombo 07", "Kandy", "Galle", "Negombo", "Kurunegala"],
  "suppliers": ["Dairy supplier", "Rice mill", "FMCG wholesaler"],
  "headOffice": "Head office",
  "counterSuffix": " · 3 counters",
  "promotions": ["Buy 2 get 1", "−10% today", "Code SAVE5"]
};

export const storyLabels = {
  "suppliers": "SUPPLIERS",
  "dairy": "DAIRY",
  "rice": "RICE",
  "fmcg": "FMCG",
  "store": "PENTARIX MART · KANDY",
  "storeRoom": "STORE ROOM",
  "stock": "STOCK",
  "openingStock": "48",
  "counter1": "COUNTER 1",
  "counter2": "COUNTER 2",
  "counter3": "COUNTER 3",
  "galle": "GALLE",
  "negombo": "NEGOMBO",
  "headOffice": "HEAD OFFICE",
  "branchSummary": "ALL BRANCHES · TODAY",
  "openingSales": "LKR 2,410,600",
  "brand": "PENTARIX",
  "delivery": "DELIVERY",
  "emptyLorry": "0",
  "goodsReceived": "GRN #2041 · 120 items received",
  "multiBuy": "3 for 2 · −95",
  "biscuits": "Biscuits −10%",
  "voucher": "SAVE5 · −5%",
  "paid": "Paid ✓",
  "lowStock": "Low stock · Milk powder",
  "purchaseOrder": "PO #318 received",
  "synced": "Synced · 3 branches",
  "credit": "CREDIT"
};

export const screenExamples = {
  "dashboard": {
    "kpis": [
      {"label": "Today's sales", "value": "186,420", "note": "▲ 12% vs last Saturday"},
      {"label": "Bills", "value": "214", "note": "4 counters open"},
      {"label": "Average bill", "value": "871.12", "note": "▲ 38.40"},
      {"label": "Returns", "value": "3", "note": "LKR 1,240 refunded"}
    ],
    "salesTitle": "Sales, last 7 days (LKR '000)",
    "days": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Today"],
    "paymentTitle": "Payment methods today",
    "payments": [
      {"label": "Cash", "value": "58%"},
      {"label": "Card", "value": "27%"},
      {"label": "Credit", "value": "11%"},
      {"label": "Bank / cheque / voucher", "value": "4%"}
    ]
  },
  "cash": {
    "title": "Denomination count · Counter 02",
    "headers": ["Note / coin", "Qty", "Total"],
    "rows": [
      ["5,000", "12", "60,000.00"],
      ["1,000", "35", "35,000.00"],
      ["500", "20", "10,000.00"],
      ["100", "48", "4,800.00"],
      ["Coins", "—", "1,260.00"]
    ],
    "totalLabel": "Counted",
    "total": "111,060.00",
    "summaryTitle": "Session summary",
    "summary": [
      ["Opened", "08:30 · Nimali"],
      ["Opening float", "10,000.00"],
      ["Cash sales", "108,940.00"],
      ["Withdrawal to safe", "−6,000.00"],
      ["Expense · delivery", "−1,630.00"],
      ["Expected", "111,310.00"],
      ["Variance", "−250.00"]
    ]
  },
  "promo": {
    "title": "Promotions · Kandy branch",
    "headers": ["Promotion", "Type", "Runs", "Used", "Status"],
    "rows": [
      ["Laundry soap 3 for 2", "Buy X get Y", "01 – 30 Nov", "142", "Active"],
      ["Biscuit week", "Item 10%", "08 – 14 Nov", "96", "Active"],
      ["Yoghurt near expiry", "Batch · LKR 20 off", "Until sold", "31", "Active"],
      ["AVURUDU5", "Code · bill 5%", "10 – 16 Apr", "418", "Ended"],
      ["Weekend LKR 250 off over 5,000", "Bill fixed", "Sat – Sun", "57", "Paused"]
    ]
  },
  "stock": {
    "title": "Batches expiring in 30 days",
    "headers": ["Item", "Batch", "Expires", "On hand", "Action"],
    "rows": [
      ["Set yoghurt 80g", "YG-1107", "2026-11-14", "64", "Batch promo on"],
      ["Fresh milk 1L", "FM-1102", "2026-11-16", "22", "Move to front"],
      ["Bread loaf 450g", "BR-1108", "2026-11-10", "9", "Return to supplier"],
      ["Cheese slices 200g", "CS-0930", "2026-12-02", "18", "OK"]
    ]
  }
};
