// Analytics data - this would come from a real API in production
export const analyticsData = {
    callVolume: [
        { day: 'Mon', calls: 145, resolved: 132 },
        { day: 'Tue', calls: 178, resolved: 161 },
        { day: 'Wed', calls: 192, resolved: 180 },
        { day: 'Thu', calls: 156, resolved: 145 },
        { day: 'Fri', calls: 189, resolved: 178 },
        { day: 'Sat', calls: 98, resolved: 94 },
        { day: 'Sun', calls: 67, resolved: 62 },
    ],

    departmentBreakdown: [
        { name: 'Election', value: 35, color: '#FF9933' },
        { name: 'MCD', value: 28, color: '#6366F1' },
        { name: 'Grievance', value: 22, color: '#10B981' },
        { name: 'Other', value: 15, color: '#64748B' },
    ],

    peakHours: [
        { hour: '9AM', calls: 45 },
        { hour: '10AM', calls: 78 },
        { hour: '11AM', calls: 92 },
        { hour: '12PM', calls: 67 },
        { hour: '1PM', calls: 45 },
        { hour: '2PM', calls: 56 },
        { hour: '3PM', calls: 89 },
        { hour: '4PM', calls: 76 },
        { hour: '5PM', calls: 54 },
    ],

    sentimentTrend: [
        { day: 'Mon', positive: 78, neutral: 15, negative: 7 },
        { day: 'Tue', positive: 82, neutral: 12, negative: 6 },
        { day: 'Wed', positive: 75, neutral: 18, negative: 7 },
        { day: 'Thu', positive: 85, neutral: 10, negative: 5 },
        { day: 'Fri', positive: 80, neutral: 14, negative: 6 },
        { day: 'Sat', positive: 88, neutral: 9, negative: 3 },
        { day: 'Sun', positive: 90, neutral: 8, negative: 2 },
    ],
};

// Call history - this would come from a database in production
export const callHistory = [
    { id: 1, callerName: 'Rajesh Kumar', callerId: '+91-98765-43210', department: 'Election', duration: 245, sentiment: 'positive', resolution: 'resolved', time: '10:45 AM' },
    { id: 2, callerName: 'Priya Sharma', callerId: '+91-87654-32109', department: 'MCD', duration: 180, sentiment: 'neutral', resolution: 'resolved', time: '10:32 AM' },
    { id: 3, callerName: 'Amit Singh', callerId: '+91-76543-21098', department: 'Grievance', duration: 320, sentiment: 'frustrated', resolution: 'escalated', time: '10:15 AM' },
    { id: 4, callerName: 'Sunita Devi', callerId: '+91-65432-10987', department: 'Election', duration: 156, sentiment: 'positive', resolution: 'resolved', time: '09:58 AM' },
    { id: 5, callerName: 'Vikram Patel', callerId: '+91-54321-09876', department: 'MCD', duration: 289, sentiment: 'neutral', resolution: 'pending', time: '09:42 AM' },
    { id: 6, callerName: 'Ananya Roy', callerId: '+91-43210-98765', department: 'Grievance', duration: 412, sentiment: 'frustrated', resolution: 'escalated', time: '09:28 AM' },
    { id: 7, callerName: 'Deepak Mehta', callerId: '+91-32109-87654', department: 'Election', duration: 198, sentiment: 'positive', resolution: 'resolved', time: '09:15 AM' },
    { id: 8, callerName: 'Kavita Joshi', callerId: '+91-21098-76543', department: 'MCD', duration: 234, sentiment: 'positive', resolution: 'resolved', time: '09:02 AM' },
];

// Active calls for dashboard
export const activeCalls = [
    {
        id: 'call-1',
        callerName: 'Rahul Verma',
        callerId: '+91-98765-12345',
        department: 'Election Commission',
        topic: 'Voter ID Status',
        sentiment: 'positive',
        language: 'Hindi',
        duration: 127,
        transcript: [
            { speaker: 'agent', text: 'Thank you for calling. How may I help you?', time: '11:23:15' },
            { speaker: 'user', text: 'I want to check my voter ID status', time: '11:23:22' },
            { speaker: 'agent', text: 'I can help with that. Please provide your EPIC number.', time: '11:23:28' },
        ]
    },
    {
        id: 'call-2',
        callerName: 'Meera Gupta',
        callerId: '+91-87654-98765',
        department: 'MCD Services',
        topic: 'Property Tax Query',
        sentiment: 'neutral',
        language: 'English',
        duration: 89,
        transcript: [
            { speaker: 'agent', text: 'Welcome to SarkariSaathi. How can I assist you?', time: '11:24:45' },
            { speaker: 'user', text: 'What is my property tax amount for this quarter?', time: '11:24:52' },
        ]
    },
    {
        id: 'call-3',
        callerName: 'Suresh Yadav',
        callerId: '+91-76543-87654',
        department: 'Grievance Cell',
        topic: 'Road Repair Complaint',
        sentiment: 'frustrated',
        language: 'Hinglish',
        duration: 203,
        transcript: [
            { speaker: 'agent', text: 'Thank you for calling. How may I help you?', time: '11:22:30' },
            { speaker: 'user', text: 'The road near my house has potholes. I want to register a complaint.', time: '11:22:38' },
            { speaker: 'agent', text: 'I understand. Let me register that complaint for you.', time: '11:22:45' },
        ]
    },
];
