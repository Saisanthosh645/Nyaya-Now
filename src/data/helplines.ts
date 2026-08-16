import { StateHelpline } from '../types';

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  description: string;
  available: string;
  category: 'emergency' | 'rights' | 'women' | 'corruption' | 'cyber';
  badgeColor?: string;
}

export const nationalHelplines: EmergencyContact[] = [
  {
    id: '112',
    name: 'National Emergency Response (ERSS)',
    number: '112',
    description: 'Unified 24x7 emergency helpline for Police, Fire, and Ambulance across all States and UTs.',
    available: '24x7 • Toll Free',
    category: 'emergency'
  },
  {
    id: '1091',
    name: 'Women in Distress Helpline',
    number: '1091',
    description: 'Direct police assistance for women facing harassment, violence, or unlawful detention.',
    available: '24x7 • Toll Free',
    category: 'women'
  },
  {
    id: '15100',
    name: 'National Legal Services Authority (NALSA)',
    number: '15100',
    description: 'Free legal aid, counsel representation, and advice for eligible citizens under Legal Services Authorities Act.',
    available: '24x7 • Toll Free',
    category: 'rights'
  },
  {
    id: '1064',
    name: 'National Anti-Corruption Helpline',
    number: '1064',
    description: 'Report bribery, extortion demands, and corrupt conduct by public servants.',
    available: 'Business hours & Recording • Toll Free',
    category: 'corruption'
  },
  {
    id: '1930',
    name: 'National Cyber Crime Helpline',
    number: '1930',
    description: 'Immediate reporting of cyber fraud, unauthorized device seizures, and digital financial crimes.',
    available: '24x7 • Toll Free',
    category: 'cyber'
  },
  {
    id: '14433',
    name: 'National Human Rights Commission (NHRC)',
    number: '14433',
    description: 'Toll-free helpline for recording human rights abuses, custodial excess, and illegal detention.',
    available: 'Mon-Fri (9:30 AM - 6:00 PM)',
    category: 'rights'
  },
  {
    id: '7827170170',
    name: 'National Commission for Women (NCW)',
    number: '7827170170',
    description: '24x7 dedicated emergency helpline for women in distress and custodial violations.',
    available: '24x7 Helpline',
    category: 'women'
  }
];

export const stateAntiCorruptionList: StateHelpline[] = [
  {
    state: 'National / Central Police (Delhi UT & CBI)',
    policeControlRoom: '112 / 100',
    acbTollFree: '1800-11-0180 (CBI) / 1064',
    womenHelpline: '1091',
    cyberCell: '1930',
    portalUrl: 'https://cbi.gov.in'
  },
  {
    state: 'Andhra Pradesh',
    policeControlRoom: '112 / 100',
    acbTollFree: '14400 / 1064',
    womenHelpline: '1091 / 181',
    cyberCell: '1930',
    portalUrl: 'https://acb.ap.gov.in'
  },
  {
    state: 'Telangana',
    policeControlRoom: '112 / 100',
    acbTollFree: '1064 / 040-23452554',
    womenHelpline: '1091 / 181',
    cyberCell: '1930',
    portalUrl: 'https://acb.telangana.gov.in'
  },
  {
    state: 'Maharashtra',
    policeControlRoom: '112 / 100',
    acbTollFree: '1064 / 1800-222-021',
    womenHelpline: '1091',
    cyberCell: '1930',
    portalUrl: 'https://acbmaharashtra.gov.in'
  },
  {
    state: 'Karnataka',
    policeControlRoom: '112 / 100',
    acbTollFree: '1064 / 080-22342100 (Lokayukta)',
    womenHelpline: '1091',
    cyberCell: '1930',
    portalUrl: 'https://lokayukta.kar.nic.in'
  },
  {
    state: 'Tamil Nadu',
    policeControlRoom: '112 / 100',
    acbTollFree: '1064 / 044-22321090 (DVAC)',
    womenHelpline: '1091',
    cyberCell: '1930',
    portalUrl: 'https://dvac.tn.gov.in'
  },
  {
    state: 'Delhi (NCT)',
    policeControlRoom: '112 / 100',
    acbTollFree: '1031 / 1064',
    womenHelpline: '1091 / 181',
    cyberCell: '1930',
    portalUrl: 'https://acb.delhi.gov.in'
  },
  {
    state: 'Uttar Pradesh',
    policeControlRoom: '112',
    acbTollFree: '9454401866 / 1064',
    womenHelpline: '1090 (Women Power Line)',
    cyberCell: '1930',
    portalUrl: 'https://uppolice.gov.in'
  },
  {
    state: 'Gujarat',
    policeControlRoom: '112 / 100',
    acbTollFree: '1064 / 1800-2334-4444',
    womenHelpline: '1091 / 181',
    cyberCell: '1930',
    portalUrl: 'https://acb.gujarat.gov.in'
  },
  {
    state: 'Rajasthan',
    policeControlRoom: '112 / 100',
    acbTollFree: '1064 / 1800-180-6127',
    womenHelpline: '1091',
    cyberCell: '1930',
    portalUrl: 'https://acb.rajasthan.gov.in'
  },
  {
    state: 'Kerala',
    policeControlRoom: '112 / 100',
    acbTollFree: '1064 / 1800-425-7011 (VACB)',
    womenHelpline: '1091',
    cyberCell: '1930',
    portalUrl: 'https://vacb.kerala.gov.in'
  },
  {
    state: 'West Bengal',
    policeControlRoom: '112 / 100',
    acbTollFree: '1800-345-5555 / 1064',
    womenHelpline: '1091',
    cyberCell: '1930',
    portalUrl: 'https://wbpolice.gov.in'
  },
  {
    state: 'Punjab & Haryana',
    policeControlRoom: '112',
    acbTollFree: '1800-1800-1000 / 1064',
    womenHelpline: '1091',
    cyberCell: '1930',
    portalUrl: 'https://vigilancebureau.punjab.gov.in'
  }
];
