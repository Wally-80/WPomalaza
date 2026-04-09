import { db } from './client';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';

export interface ProposalPackage {
  name: string;
  oneTime: string;
  monthly: string;
  description: string;
}

export interface MaintenanceTier {
  name: string;
  price: string;
  includes: string;
}

export interface BundleOption {
  name: string;
  price: string;
}

export interface Proposal {
  id?: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  preferredPackage?: string;
  paymentType: 'one-time' | 'monthly';
  startDate?: string;
  status: 'draft' | 'sent' | 'accepted';
  createdAt: Timestamp;
  acceptedAt?: Timestamp;
  customNotes?: string;
  
  // Pricing Content
  packages: ProposalPackage[];
  maintenanceTiers: MaintenanceTier[];
  bundles: BundleOption[];
  features: string[];
}

export const PREDEFINED_SERVICES = {
  packages: [
    { name: 'Starter Website', oneTime: '$1,200', monthly: '$99/mo', description: '3-5 pages, responsive, contact form, SEO' },
    { name: 'Business Website', oneTime: '$2,000', monthly: '$149/mo', description: '5-10 pages, advanced UI, SEO, lead capture' },
    { name: 'Advanced Website', oneTime: '$3,500', monthly: '$249/mo', description: 'Custom design, integrations, automation' },
    { name: 'Native App', oneTime: '$8k-$20k', monthly: '$399+/mo', description: 'iOS/Android, backend, APIs' },
  ],
  maintenanceTiers: [
    { name: 'Basic', price: '$49', includes: 'Updates, backups, monitoring, 1 hr fixes' },
    { name: 'Standard', price: '$99', includes: 'Everything Basic + SEO + 5 updates' },
    { name: 'Premium', price: '$199', includes: 'Priority, analytics, security, 4 hrs dev' },
  ],
  bundles: [
    { name: 'Starter + Basic', price: '$139/mo' },
    { name: 'Business + Standard', price: '$219/mo' },
    { name: 'Advanced + Premium', price: '$399/mo' },
    { name: 'Native App + Premium', price: '$549+/mo' },
  ],
  features: [
    'Modern, mobile-friendly design',
    'Fast loading speed (Core Web Vitals optimized)',
    'SEO-ready structure',
    'Contact forms & lead generation tools',
    'Easy future upgrades (PWA or App)',
    'Free SSL certificate + secure hosting (monthly plans)',
    'Google Analytics setup & basic dashboard',
  ]
};

export const DEFAULT_PROPOSAL: Partial<Proposal> = {
  status: 'draft',
  paymentType: 'one-time',
  packages: [],
  maintenanceTiers: [],
  bundles: [],
  features: [
    'Modern, mobile-friendly design',
    'Fast loading speed (Core Web Vitals optimized)',
    'SEO-ready structure',
    'Contact forms & lead generation tools',
    'Easy future upgrades (PWA or App)',
    'Free SSL certificate + secure hosting (monthly plans)',
    'Google Analytics setup & basic dashboard',
  ]
};

const COLLECTION_NAME = 'proposals';

export const createProposal = async (proposal: Omit<Proposal, 'id' | 'createdAt'>) => {
  return await addDoc(collection(db, COLLECTION_NAME), {
    ...proposal,
    createdAt: serverTimestamp(),
  });
};

export const updateProposal = async (id: string, data: Partial<Proposal>) => {
  const proposalRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(proposalRef, data);
};

export const getProposal = async (id: string): Promise<Proposal | null> => {
  const proposalRef = doc(db, COLLECTION_NAME, id);
  const snap = await getDoc(proposalRef);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() } as Proposal;
  }
  return null;
};

export const getAllProposals = async (): Promise<Proposal[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Proposal));
};

export const subscribeToProposals = (callback: (proposals: Proposal[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const proposals = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Proposal));
    callback(proposals);
  });
};
