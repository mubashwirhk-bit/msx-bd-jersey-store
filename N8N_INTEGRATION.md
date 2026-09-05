# n8n Integration Guide - MSX BD Jersey Store

## Overview
এই গাইডে আপনি শিখবেন কিভাবে n8n ওয়ার্কফ্লো এর মাধ্যমে MSX BD Jersey Store API কে ইন্টিগ্রেট করতে হয়।

---

## API Endpoints

### 1. Get All Website Information
**URL:** `https://msx-bd-jersey-store.vercel.app/api/all`  
**Method:** GET  
**Description:** পুরো ওয়েবসাইট এর A to Z তথ্য পান

**Response Example:**
```json
{
  "website": {
    "name": "MSX BD Jersey Store",
    "url": "https://msx-bd-jersey-store.vercel.app"
  },
  "inventory": {
    "total_jerseys": 5,
    "jerseys": [...]
  },
  "api_endpoints": {...}
}
```

---

### 2. Get All Jerseys
**URL:** `https://msx-bd-jersey-store.vercel.app/api/jerseys`  
**Method:** GET  
**Description:** সব জার্সি এর লিস্ট পান

**Response:**
```json
[
  {
    "id": 1,
    "team": "Barcelona",
    "type": "Club",
    "color": "Blue & Red",
    "size": "M",
    "price": 3500,
    "description": "Official Barcelona FC Home Jersey"
  }
]
```

---

### 3. Get Single Jersey
**URL:** `https://msx-bd-jersey-store.vercel.app/api/jerseys/[id]`  
**Method:** GET  
**Description:** একটা নির্দিষ্ট জার্সি এর তথ্য পান

**Example:** `/api/jerseys/1`

---

### 4. Add New Jersey
**URL:** `https://msx-bd-jersey-store.vercel.app/api/jerseys`  
**Method:** POST  
**Description:** নতুন জার্সি যোগ করুন

**Request Body:**
```json
{
  "team": "Liverpool",
  "type": "Club",
  "color": "Red",
  "size": "L",
  "price": 3800,
  "description": "Liverpool Home Jersey 2024"
}
```

---

### 5. Delete Jersey
**URL:** `https://msx-bd-jersey-store.vercel.app/api/jerseys/[id]`  
**Method:** DELETE  
**Description:** একটা জার্সি ডিলিট করুন

**Example:** `/api/jerseys/1`

---

## n8n Workflow Examples

### Workflow 1: প্রতিদিন সব জার্সি ডেটা ব্যাকআপ করুন

**Steps:**
1. **Trigger:** Every day at 10:00 AM
2. **HTTP Request Node:**
   - URL: `https://msx-bd-jersey-store.vercel.app/api/all`
   - Method: GET
3. **Save/Send Data:** Google Sheets, Database, বা Email এ পাঠান

---

### Workflow 2: নতুন জার্সি যুক্ত হলে টেলিগ্রামে নোটিফিকেশন পাঠান

**Steps:**
1. **Trigger:** Webhook (যখন নতুন jersey যোগ হয়)
2. **HTTP Request Node:**
   - URL: `https://msx-bd-jersey-store.vercel.app/api/jerseys`
   - Method: POST
3. **Telegram Node:** Message পাঠান - "নতুন জার্সি যুক্ত: [Team Name]"

---

### Workflow 3: প্রতি ঘণ্টায় ইনভেন্টরি চেক করুন

**Steps:**
1. **Trigger:** Every hour
2. **HTTP Request Node:**
   - URL: `https://msx-bd-jersey-store.vercel.app/api/all`
   - Method: GET
3. **Conditional Node:** যদি jerseys কম হয়, alert পাঠান
4. **Email/Slack Node:** Notification পাঠান

---

### Workflow 4: জার্সি ডেটা Excel এ এক্সপোর্ট করুন

**Steps:**
1. **Trigger:** Manual or Scheduled
2. **HTTP Request Node:**
   - URL: `https://msx-bd-jersey-store.vercel.app/api/jerseys`
   - Method: GET
3. **Spreadsheet Node:** Data কে Excel ফরম্যাটে রূপান্তর করুন
4. **Google Drive Node:** File upload করুন

---

## n8n Setup Instructions

### Step 1: HTTP Request Node Configure করুন
1. n8n এ নতুন workflow তৈরি করুন
2. "HTTP Request" node যোগ করুন
3. উপরের API URLs ব্যবহার করুন
4. Method নির্বাচন করুন (GET/POST/DELETE)

### Step 2: Headers সেট করুন (যদি প্রয়োজন হয়)
```json
{
  "Content-Type": "application/json"
}
```

### Step 3: Body সেট করুন (POST এর জন্য)
```json
{
  "team": "Team Name",
  "type": "Club",
  "color": "Color",
  "size": "M",
  "price": 0,
  "description": "Description"
}
```

### Step 4: Response Handle করুন
- Response data access করুন: `{{ $json }}`
- Specific field access: `{{ $json.inventory.total_jerseys }}`

---

## Common n8n Nodes এর সাথে Integration

### Google Sheets এ ডেটা সেভ করুন
```
HTTP Request → Google Sheets Append Row
```

### Email পাঠান
```
HTTP Request → Email Send
- To: your@email.com
- Subject: New Jersey Added
- Body: {{ $json.team }}
```

### Telegram নোটিফিকেশন
```
HTTP Request → Telegram Send Message
- Chat ID: your_chat_id
- Message: New Jersey: {{ $json.team }}
```

### Slack এ পোস্ট করুন
```
HTTP Request → Slack Send Message
- Channel: #jersey-updates
- Message: {{ $json }}
```

---

## Error Handling

### চেক করুন Response Status
```
HTTP Request
- Add Catch node for errors
- Handle 404, 500, timeout errors
```

### Log Data for Debugging
```
Add Console Log Node:
- {{ $json }}
```

---

## Performance Tips

1. **Batch Requests:** একসাথে অনেক জার্সি যোগ করার সময় loop ব্যবহার করুন
2. **Caching:** পুনরাবৃত্ত ডেটা এর জন্য cache সেট করুন
3. **Rate Limiting:** n8n rate limit মাথায় রাখুন
4. **Retry Logic:** Failed requests এর জন্য retry সেট করুন

---

## Troubleshooting

### সমস্যা: "404 Not Found"
- সঠিক endpoint URL চেক করুন
- Jersey ID সঠিক কিনা দেখুন

### সমস্যা: "405 Method Not Allowed"
- সঠিক HTTP method ব্যবহার করছেন কিনা চেক করুন
- GET, POST, DELETE সঠিক endpoint এর সাথে

### সমস্যা: "CORS Error"
- API CORS enabled কিনা দেখুন
- Browser console এ error দেখুন

---

## সম্পূর্ণ n8n Workflow Example

```
Trigger (Schedule: Every day at 9 AM)
  ↓
HTTP Request (GET /api/all)
  ↓
Data Transform (Extract jerseys array)
  ↓
Google Sheets (Append data)
  ↓
Telegram (Send summary message)
  ↓
End
```

---

## যোগাযোগ

যদি কোনো সমস্যা হয়:
- Email: mubashwirhk@gmail.com
- WhatsApp: +880 1234-567890
- GitHub Issues: https://github.com/mubashwirhk-bit/msx-bd-jersey-store

---

Happy Automation! 🚀
