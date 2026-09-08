export interface LocalRegionOption {
  country: string;
  states: {
    name: string;
    districts: {
      name: string;
      cities: string[];
    }[];
  }[];
}

export const locationHierarchy: LocalRegionOption = {
  country: 'India',
  states: [
    {
      name: 'Maharashtra',
      districts: [
        {
          name: 'Palghar',
          cities: ['Virar', 'Vasai', 'Palghar City', 'Boisar', 'Dahanu']
        },
        {
          name: 'Mumbai Suburban',
          cities: ['Bandra', 'Andheri', 'Borivali', 'Goregaon']
        },
        {
          name: 'Thane',
          cities: ['Thane City', 'Kalyan', 'Dombivli', 'Mira Road']
        },
        {
          name: 'Pune',
          cities: ['Pune City', 'Pimpri-Chinchwad', 'Hinjawadi']
        }
      ]
    },
    {
      name: 'Karnataka',
      districts: [
        {
          name: 'Bengaluru Urban',
          cities: ['Whitefield', 'Koramangala', 'Indiranagar', 'Electronic City']
        }
      ]
    },
    {
      name: 'Delhi NCR',
      districts: [
        {
          name: 'New Delhi',
          cities: ['Connaught Place', 'Chanakyapuri', 'Dwarka']
        }
      ]
    }
  ]
};

export const mockLocalHierarchy = locationHierarchy;

export interface LocalAlert {
  id: string;
  type: 'traffic' | 'weather' | 'civic' | 'infrastructure' | 'public_service';
  title: string;
  location: string;
  time: string;
  severity: 'low' | 'moderate' | 'high';
  description: string;
}

export const mockLocalAlerts: LocalAlert[] = [
  {
    id: 'alt-1',
    type: 'infrastructure',
    title: 'Virar-Dahanu Track Doubling Survey Works',
    location: 'Virar West / Saphale Stretch',
    time: '2 hours ago',
    severity: 'moderate',
    description: 'Minor detour on station approach road between 23:00 and 04:00 for geotechnical soil core sampling.'
  },
  {
    id: 'alt-2',
    type: 'weather',
    title: 'Coastal High Tide Warning (4.12m)',
    location: 'Palghar Coastal Belt & Vasai Creek',
    time: '4 hours ago',
    severity: 'moderate',
    description: 'Fishermen and recreational beachgoers advised to exercise caution during afternoon tidal swell.'
  },
  {
    id: 'alt-3',
    type: 'civic',
    title: 'VVCMC Municipal Water Supply Pipeline Maintenance',
    location: 'Virar East (Manvelpada & Phoolpada sectors)',
    time: '6 hours ago',
    severity: 'low',
    description: 'Scheduled maintenance of 1200mm Surya reservoir conduit; water pressure normalized by 18:00.'
  },
  {
    id: 'alt-4',
    type: 'public_service',
    title: 'Palghar District Super-Speciality Hospital Ward Opening',
    location: 'Palghar New Administrative Complex',
    time: '1 day ago',
    severity: 'low',
    description: 'New 200-bed trauma and pediatric facility commences patient admissions with 24/7 dialysis suite.'
  }
];
