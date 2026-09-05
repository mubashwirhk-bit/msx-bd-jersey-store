import { jerseyData } from './data';

// GET all website information - A to Z
export default function handler(req, res) {
  if (req.method === 'GET') {
    const websiteInfo = {
      website: {
        name: 'MSX BD Jersey Store',
        description: 'Premium Football Jersey Store in Bangladesh',
        url: 'https://msx-bd-jersey-store.vercel.app',
        language: 'Bengali & English',
        timezone: 'Asia/Dhaka'
      },
      store: {
        owner: 'MSX BD',
        email: 'mubashwirhk@gmail.com',
        phone: '+880 1234-567890',
        location: 'Dhaka, Bangladesh',
        currency: 'BDT (৳)'
      },
      inventory: {
        total_jerseys: jerseyData.length,
        jerseys: jerseyData,
        categories: {
          club: jerseyData.filter(j => j.type === 'Club').length,
          national: jerseyData.filter(j => j.type === 'National').length,
          vintage: jerseyData.filter(j => j.type === 'Vintage').length
        }
      },
      pricing: {
        min_price: Math.min(...jerseyData.map(j => j.price)),
        max_price: Math.max(...jerseyData.map(j => j.price)),
        average_price: Math.round(jerseyData.reduce((sum, j) => sum + j.price, 0) / jerseyData.length),
        sizes_available: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      },
      api_endpoints: {
        all_info: '/api/all',
        get_all_jerseys: '/api/jerseys',
        get_single_jersey: '/api/jerseys/[id]',
        add_jersey: 'POST /api/jerseys',
        delete_jersey: 'DELETE /api/jerseys/[id]'
      },
      features: [
        'Add new jerseys',
        'View all jerseys',
        'Delete jerseys',
        'Filter by type and size',
        'Real-time updates',
        'n8n integration ready'
      ],
      social_media: {
        facebook: 'https://facebook.com/msxbdjersey',
        instagram: '@msxbdjersey',
        whatsapp: '+880 1234-567890'
      },
      payment_methods: [
        'bKash',
        'Nagad',
        'Rocket',
        'Bank Transfer',
        'COD (Cash on Delivery)'
      ],
      delivery: {
        areas: ['Dhaka', 'Chittagong', 'Sylhet', 'All Bangladesh'],
        delivery_time: '2-5 business days',
        shipping_cost: 'Free above 5000 BDT'
      },
      support: {
        email: 'support@msxbdjersey.com',
        phone: '+880 1234-567890',
        whatsapp: '+880 1234-567890',
        response_time: '24 hours'
      },
      metadata: {
        version: '1.0.0',
        last_updated: new Date().toISOString(),
        api_documentation: 'See README.md',
        n8n_integration: 'Available - See n8n-integration.md'
      }
    };

    res.status(200).json(websiteInfo);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
