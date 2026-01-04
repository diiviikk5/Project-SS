// Mock data for SarkariSaathi demo
export const mockCalls = [
  {
    id: 'call_001',
    callerId: '+91 98XX-XXX-123',
    callerName: 'Rajesh Kumar',
    department: 'Election Commission',
    status: 'active',
    duration: 145,
    sentiment: 'neutral',
    language: 'Hindi',
    topic: 'Voter ID Status',
    startTime: new Date(Date.now() - 145000).toISOString(),
    transcript: [
      { speaker: 'agent', text: 'नमस्ते, सरकारी साथी में आपका स्वागत है। मैं आपकी क्या सहायता कर सकता हूं?', time: '00:00' },
      { speaker: 'user', text: 'मुझे अपने वोटर आईडी का स्टेटस जानना है', time: '00:05' },
      { speaker: 'agent', text: 'जी बिल्कुल। कृपया अपना वोटर आईडी नंबर बताएं।', time: '00:08' },
      { speaker: 'user', text: 'XYZ1234567', time: '00:15' },
      { speaker: 'agent', text: 'धन्यवाद। आपका वोटर आईडी एक्टिव है। क्या कोई और सहायता चाहिए?', time: '00:22' },
    ]
  },
  {
    id: 'call_002',
    callerId: '+91 87XX-XXX-456',
    callerName: 'Priya Sharma',
    department: 'MCD Services',
    status: 'active',
    duration: 89,
    sentiment: 'positive',
    language: 'English',
    topic: 'Property Tax Query',
    startTime: new Date(Date.now() - 89000).toISOString(),
    transcript: [
      { speaker: 'agent', text: 'Welcome to SarkariSaathi. How may I assist you today?', time: '00:00' },
      { speaker: 'user', text: 'I need to know my property tax due amount', time: '00:04' },
      { speaker: 'agent', text: 'Sure, I can help with that. May I have your property ID?', time: '00:08' },
    ]
  },
  {
    id: 'call_003',
    callerId: '+91 99XX-XXX-789',
    callerName: 'Amit Verma',
    department: 'Grievance Cell',
    status: 'active',
    duration: 234,
    sentiment: 'frustrated',
    language: 'Hinglish',
    topic: 'Road Repair Complaint',
    startTime: new Date(Date.now() - 234000).toISOString(),
    transcript: [
      { speaker: 'agent', text: 'नमस्ते, SarkariSaathi में आपका स्वागत है।', time: '00:00' },
      { speaker: 'user', text: 'Yaar meri road repair ki complaint ka kya hua?', time: '00:05' },
      { speaker: 'agent', text: 'आपकी complaint ID बताएं please.', time: '00:10' },
    ]
  },
];

export const mockCallHistory = [
  { id: 'h001', callerId: '+91 98XX-XXX-111', callerName: 'Sunita Devi', department: 'Election', duration: 180, sentiment: 'positive', resolution: 'resolved', time: '10:30 AM' },
  { id: 'h002', callerId: '+91 87XX-XXX-222', callerName: 'Mohammed Ali', department: 'MCD', duration: 240, sentiment: 'neutral', resolution: 'resolved', time: '10:15 AM' },
  { id: 'h003', callerId: '+91 99XX-XXX-333', callerName: 'Kavita Singh', department: 'Grievance', duration: 320, sentiment: 'frustrated', resolution: 'escalated', time: '09:45 AM' },
  { id: 'h004', callerId: '+91 76XX-XXX-444', callerName: 'Ramesh Yadav', department: 'Election', duration: 95, sentiment: 'positive', resolution: 'resolved', time: '09:30 AM' },
  { id: 'h005', callerId: '+91 85XX-XXX-555', callerName: 'Anjali Gupta', department: 'MCD', duration: 420, sentiment: 'neutral', resolution: 'pending', time: '09:00 AM' },
  { id: 'h006', callerId: '+91 94XX-XXX-666', callerName: 'Vikram Patel', department: 'Election', duration: 150, sentiment: 'positive', resolution: 'resolved', time: '08:45 AM' },
  { id: 'h007', callerId: '+91 83XX-XXX-777', callerName: 'Neha Sharma', department: 'Grievance', duration: 280, sentiment: 'frustrated', resolution: 'escalated', time: '08:30 AM' },
  { id: 'h008', callerId: '+91 92XX-XXX-888', callerName: 'Deepak Kumar', department: 'MCD', duration: 200, sentiment: 'neutral', resolution: 'resolved', time: '08:15 AM' },
];

export const mockStats = {
  totalCalls: 1247,
  activeCalls: 3,
  avgDuration: '3:42',
  resolutionRate: 87.5,
  satisfaction: 4.2,
  waitTime: '< 1s',
};

export const mockAnalytics = {
  callVolume: [
    { day: 'Mon', calls: 180, resolved: 162 },
    { day: 'Tue', calls: 220, resolved: 198 },
    { day: 'Wed', calls: 195, resolved: 175 },
    { day: 'Thu', calls: 240, resolved: 216 },
    { day: 'Fri', calls: 210, resolved: 189 },
    { day: 'Sat', calls: 120, resolved: 108 },
    { day: 'Sun', calls: 82, resolved: 74 },
  ],
  departmentBreakdown: [
    { name: 'Election Commission', value: 45, color: '#FF9933' },
    { name: 'MCD Services', value: 30, color: '#6366F1' },
    { name: 'Grievance Cell', value: 15, color: '#10B981' },
    { name: 'Other', value: 10, color: '#6B7280' },
  ],
  peakHours: [
    { hour: '9 AM', calls: 120 },
    { hour: '10 AM', calls: 180 },
    { hour: '11 AM', calls: 220 },
    { hour: '12 PM', calls: 150 },
    { hour: '1 PM', calls: 80 },
    { hour: '2 PM', calls: 140 },
    { hour: '3 PM', calls: 200 },
    { hour: '4 PM', calls: 190 },
    { hour: '5 PM', calls: 160 },
  ],
  sentimentTrend: [
    { day: 'Mon', positive: 65, neutral: 25, negative: 10 },
    { day: 'Tue', positive: 70, neutral: 22, negative: 8 },
    { day: 'Wed', positive: 68, neutral: 24, negative: 8 },
    { day: 'Thu', positive: 72, neutral: 20, negative: 8 },
    { day: 'Fri', positive: 75, neutral: 18, negative: 7 },
    { day: 'Sat', positive: 78, neutral: 17, negative: 5 },
    { day: 'Sun', positive: 80, neutral: 15, negative: 5 },
  ],
};

export const governmentResponses = {
  greetings: [
    'नमस्ते! सरकारी साथी में आपका स्वागत है। मैं आपकी सेवा में हूं।',
    'Hello! Welcome to SarkariSaathi. How may I assist you today?',
  ],
  voterServices: [
    'आपके वोटर आईडी का स्टेटस चेक करने के लिए, कृपया अपना EPIC नंबर बताएं।',
    'To check your polling booth location, please provide your voter ID or address.',
    'आप अपना नाम voter list में nvsp.in पर भी चेक कर सकते हैं।',
  ],
  mcdServices: [
    'MCD property tax payment के लिए, आप mcdonline.nic.in पर जा सकते हैं।',
    'For birth/death certificate, please visit your local MCD office with required documents.',
    'Trade license renewal की last date 31st March है।',
  ],
  grievance: [
    'आपकी शिकायत दर्ज हो गई है। आपका ticket number है: GRV-2024-',
    'Your complaint has been registered. You will receive an SMS with the ticket number.',
    'सामान्यतः शिकायतों का समाधान 7-15 working days में किया जाता है।',
  ],
  farewell: [
    'धन्यवाद! आपका दिन शुभ हो। जय हिंद!',
    'Thank you for calling SarkariSaathi. Have a great day!',
    'कोई और सहायता चाहिए तो कृपया दोबारा कॉल करें।',
  ],
};
