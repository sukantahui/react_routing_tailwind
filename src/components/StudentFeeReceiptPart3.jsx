// src/components/StudentFeeReceiptPart3.jsx
import React, { useState, useEffect, useRef } from 'react';
import CNATLogo from "../../public/assets/cnat.png";
import paidStamp from "../assets/images/paid-stamp.png";
import * as htmlToImage from 'html-to-image';
import { studentService } from '../services/studentService';
import { courseService } from '../services/courseService';
import { loginService } from '../services/loginService';
import { simpleFeesReceiptService } from '../services/simpleFeesReceiptService';

const StudentFeeReceiptPart3 = () => {
  // Get current date in YYYY-MM-DD format for default value
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // State for current user (authorized collector)
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // State for students from database
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [error, setError] = useState(null);
  const [selectedStudentRegNo, setSelectedStudentRegNo] = useState('');

  // State for courses from database
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [coursesError, setCoursesError] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  // State for new student form
  const [showNewStudentForm, setShowNewStudentForm] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    student_name: '',
    nickname: '',
    whatsapp: ''
  });
  const [isCreatingStudent, setIsCreatingStudent] = useState(false);
  const [createStudentError, setCreateStudentError] = useState(null);

  // State for new course form
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);
  const [newCourseData, setNewCourseData] = useState({
    courseCode: '',
    courseName: ''
  });
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [createCourseError, setCreateCourseError] = useState(null);

  // State for saving receipt
  const [isSavingToDatabase, setIsSavingToDatabase] = useState(false);
  const [saveError, setSaveError] = useState(null);
  
  // State for developer tools
  const [showDevTools, setShowDevTools] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    course: '',
    feeType: 'non_monthly',
    monthlyFeeAmount: '',
    feesPaid: '',
    paymentDate: getCurrentDate(),
    paymentMode: 'Cash',
    periodFrom: '',
    periodTo: '',
    registrationNumber: '',
  });

  const [receiptData, setReceiptData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);
  const receiptRef = useRef(null);

  // Convert imported images to data URLs for print
  const [logoDataUrl, setLogoDataUrl] = useState('');
  const [paidStampDataUrl, setPaidStampDataUrl] = useState('');

  // Check if in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Fetch current user (authorized collector)
  const fetchCurrentUser = async () => {
    setLoadingUser(true);
    try {
      const response = await loginService.currentUser();
      if (response && response.status === true && response.data) {
        setCurrentUser(response.data);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    } finally {
      setLoadingUser(false);
    }
  };

  // Fetch students from database
  useEffect(() => {
    fetchCurrentUser();
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    setLoadingStudents(true);
    setError(null);
    try {
      const response = await studentService.getAll();
      
      let studentsArray = [];
      
      if (response && response.data && Array.isArray(response.data)) {
        studentsArray = response.data;
      } else if (Array.isArray(response)) {
        studentsArray = response;
      } else if (response && response.data && response.data.data && Array.isArray(response.data.data)) {
        studentsArray = response.data.data;
      }
      
      setStudents(studentsArray);
      
      if (studentsArray.length === 0) {
        console.warn('No students found in database');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to load students from database. Please try again later.');
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  // Fetch courses from database
  const fetchCourses = async () => {
    setLoadingCourses(true);
    setCoursesError(null);
    try {
      const response = await courseService.getAll();
      
      let coursesArray = [];
      
      if (response && response.status === true && Array.isArray(response.data)) {
        coursesArray = response.data;
      } else if (Array.isArray(response)) {
        coursesArray = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        coursesArray = response.data;
      }
      
      setCourses(coursesArray);
      
      if (coursesArray.length === 0) {
        console.warn('No courses found in database');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCoursesError('Failed to load courses from database. Please try again later.');
      setCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  };

  // Helper function to get collector name
  const getCollectorName = () => {
    if (!currentUser) return 'System';
    
    if (currentUser.employee && currentUser.employee.employeeName) {
      return currentUser.employee.employeeName;
    }
    
    if (currentUser.userName) {
      return currentUser.userName;
    }
    
    return 'Authorized Collector';
  };

  // Helper function to get collector designation
  const getCollectorDesignation = () => {
    if (!currentUser) return '';
    
    if (currentUser.employee && currentUser.employee.designation) {
      return currentUser.employee.designation.name;
    }
    
    if (currentUser.userType && currentUser.userType.userTypeName) {
      return currentUser.userType.userTypeName;
    }
    
    return 'Accounts Department';
  };

  // Handle new student form input changes
  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudentData(prev => ({
      ...prev,
      [name]: value
    }));
    if (createStudentError) setCreateStudentError(null);
  };

  // Create new student
  const handleCreateStudent = async (e) => {
    e.preventDefault();
    
    if (!newStudentData.student_name.trim()) {
      setCreateStudentError('Student name is required');
      return;
    }
    if (!newStudentData.whatsapp.trim()) {
      setCreateStudentError('WhatsApp number is required');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(newStudentData.whatsapp)) {
      setCreateStudentError('Please enter a valid 10-digit WhatsApp number');
      return;
    }

    setIsCreatingStudent(true);
    setCreateStudentError(null);

    try {
      const payload = {
        student_name: newStudentData.student_name.trim(),
        nickname: newStudentData.nickname.trim() || newStudentData.student_name.trim(),
        whatsapp: newStudentData.whatsapp.trim()
      };

      const response = await studentService.createBasic(payload);
      
      if (response && response.status === true) {
        const createdStudent = response.data;
        
        await fetchStudents();
        
        if (createdStudent && createdStudent.id) {
          setSelectedStudentId(createdStudent.id.toString());
          setSelectedStudentRegNo(createdStudent.registrationNumber || '');
          setFormData(prev => ({
            ...prev,
            studentName: createdStudent.student_name || '',
            phone: createdStudent.whatsapp || '',
            registrationNumber: createdStudent.registrationNumber || '',
          }));
        }
        
        setNewStudentData({
          student_name: '',
          nickname: '',
          whatsapp: ''
        });
        setShowNewStudentForm(false);
        
        alert(`Student "${createdStudent.student_name}" created successfully!\nRegistration Number: ${createdStudent.registrationNumber}`);
      } else {
        setCreateStudentError(response?.message || 'Failed to create student');
      }
    } catch (error) {
      console.error('Error creating student:', error);
      setCreateStudentError(error.response?.data?.message || 'Failed to create student. Please try again.');
    } finally {
      setIsCreatingStudent(false);
    }
  };

  // Handle new course form input changes
  const handleNewCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourseData(prev => ({
      ...prev,
      [name]: value
    }));
    if (createCourseError) setCreateCourseError(null);
  };

  // Create new course
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    
    if (!newCourseData.courseCode.trim()) {
      setCreateCourseError('Course code is required');
      return;
    }
    if (!newCourseData.courseName.trim()) {
      setCreateCourseError('Course name is required');
      return;
    }

    setIsCreatingCourse(true);
    setCreateCourseError(null);

    try {
      const payload = {
        courseCode: newCourseData.courseCode.trim().toUpperCase(),
        courseName: newCourseData.courseName.trim()
      };

      const response = await courseService.createBasic(payload);
      
      if (response && response.status === true) {
        const createdCourse = response.data;
        
        await fetchCourses();
        
        if (createdCourse && createdCourse.id) {
          setSelectedCourseId(createdCourse.id.toString());
          setFormData(prev => ({
            ...prev,
            course: createdCourse.courseName || ''
          }));
        }
        
        setNewCourseData({
          courseCode: '',
          courseName: ''
        });
        setShowNewCourseForm(false);
        
        alert(`Course "${createdCourse.courseName}" created successfully!\nCourse Code: ${createdCourse.courseCode}`);
      } else {
        setCreateCourseError(response?.message || 'Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      setCreateCourseError(error.response?.data?.message || 'Failed to create course. Please try again.');
    } finally {
      setIsCreatingCourse(false);
    }
  };

  useEffect(() => {
    const loadImagesAsDataUrls = async () => {
      try {
        const logoResponse = await fetch(CNATLogo);
        const logoBlob = await logoResponse.blob();
        const logoDataUrlReader = new FileReader();
        logoDataUrlReader.onloadend = () => {
          setLogoDataUrl(logoDataUrlReader.result);
        };
        logoDataUrlReader.readAsDataURL(logoBlob);

        const stampResponse = await fetch(paidStamp);
        const stampBlob = await stampResponse.blob();
        const stampDataUrlReader = new FileReader();
        stampDataUrlReader.onloadend = () => {
          setPaidStampDataUrl(stampDataUrlReader.result);
        };
        stampDataUrlReader.readAsDataURL(stampBlob);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImagesAsDataUrls();
  }, []);

  // Handle student selection from dropdown
  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);
    
    if (studentId) {
      const selectedStudent = students.find(s => s.studentId === parseInt(studentId));
      if (selectedStudent) {
        setSelectedStudentRegNo(selectedStudent.registrationNumber || '');
        setFormData(prev => ({
          ...prev,
          studentName: selectedStudent.studentName || '',
          phone: selectedStudent.whatsapp || selectedStudent.phone1 || '',
          registrationNumber: selectedStudent.registrationNumber || '',
        }));
      }
    } else {
      setSelectedStudentRegNo('');
      setFormData(prev => ({
        ...prev,
        studentName: '',
        phone: '',
        registrationNumber: '',
      }));
    }
  };

  // Handle course selection from dropdown
  const handleCourseSelect = (e) => {
    const courseId = e.target.value;
    setSelectedCourseId(courseId);
    
    if (courseId) {
      const selectedCourse = courses.find(c => c.id === parseInt(courseId));
      if (selectedCourse) {
        setFormData(prev => ({
          ...prev,
          course: selectedCourse.courseName || ''
        }));
      }
    } else {
      setSelectedCourseId('');
      setFormData(prev => ({
        ...prev,
        course: ''
      }));
    }
  };

  const generateReceiptNo = (studentName, course, paymentDate, feesPaid) => {
    const prefix = 'CNAT';
    const studentKey = `${studentName.trim()}_${course}_${paymentDate}_${feesPaid}`;
    
    const hashString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(36).toUpperCase();
    };
    
    const hashValue = hashString(studentKey);
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;
    const uniqueId = hashValue.substring(0, 8);
    
    return `${prefix}-${dateStr}-${uniqueId}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === 'studentName' || name === 'phone') {
      setSelectedStudentId('');
      setSelectedStudentRegNo('');
      setFormData(prev => ({ ...prev, registrationNumber: '' }));
    }
  };

  const calculateMonthsDifference = (fromDate, toDate) => {
    if (!fromDate || !toDate) return 0;
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1;
    return months > 0 ? months : 0;
  };

  const handleFeeTypeChange = (e) => {
    const feeType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      feeType: feeType,
      feesPaid: '',
      periodFrom: '',
      periodTo: '',
      monthlyFeeAmount: '',
    }));
  };

  const calculateTotalFees = () => {
    if (formData.feeType === 'monthly') {
      const months = calculateMonthsDifference(formData.periodFrom, formData.periodTo);
      const monthlyAmount = parseFloat(formData.monthlyFeeAmount) || 0;
      const total = months * monthlyAmount;
      setFormData((prev) => ({
        ...prev,
        feesPaid: total.toString(),
      }));
    }
  };

  useEffect(() => {
    if (formData.feeType === 'monthly' && formData.periodFrom && formData.periodTo && formData.monthlyFeeAmount) {
      calculateTotalFees();
    }
  }, [formData.periodFrom, formData.periodTo, formData.monthlyFeeAmount, formData.feeType]);

  // Get payload for API (development tool)
  const getApiPayload = () => {
    const payload = {
      receipt_no: generateReceiptNo(
        formData.studentName,
        formData.course,
        formData.paymentDate,
        formData.feesPaid
      ),
      student_id: selectedStudentId ? parseInt(selectedStudentId) : null,
      course_id: selectedCourseId ? parseInt(selectedCourseId) : null,
      fee_type: formData.feeType,
      amount_paid: parseFloat(formData.feesPaid) || 0,
      monthly_fee_amount: formData.feeType === 'monthly' && formData.monthlyFeeAmount ? parseFloat(formData.monthlyFeeAmount) : null,
      period_from: formData.feeType === 'monthly' && formData.periodFrom ? formData.periodFrom : null,
      period_to: formData.feeType === 'monthly' && formData.periodTo ? formData.periodTo : null,
      payment_date: formData.paymentDate,
      payment_mode: formData.paymentMode.toLowerCase()
    };

    // Remove null/undefined values for cleaner display
    Object.keys(payload).forEach(key => {
      if (payload[key] === null || payload[key] === undefined || payload[key] === '') {
        delete payload[key];
      }
    });

    return payload;
  };

  // Copy payload to clipboard
  const copyPayloadToClipboard = async () => {
    const payload = getApiPayload();
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  // Save receipt to database
  const saveReceiptToDatabase = async (receiptNo) => {
    if (!selectedStudentId) {
      setSaveError('Please select a student from the database');
      return false;
    }
    
    if (!selectedCourseId) {
      setSaveError('Please select a course from the database');
      return false;
    }

    setIsSavingToDatabase(true);
    setSaveError(null);

    try {
      const payload = {
        receipt_no: receiptNo,
        student_id: parseInt(selectedStudentId),
        course_id: parseInt(selectedCourseId),
        fee_type: formData.feeType,
        amount_paid: parseFloat(formData.feesPaid),
        monthly_fee_amount: formData.feeType === 'monthly' ? parseFloat(formData.monthlyFeeAmount) : null,
        period_from: formData.feeType === 'monthly' && formData.periodFrom ? formData.periodFrom : null,
        period_to: formData.feeType === 'monthly' && formData.periodTo ? formData.periodTo : null,
        payment_date: formData.paymentDate,
        payment_mode: formData.paymentMode
      };

      const response = await simpleFeesReceiptService.create(payload);
      
      if (response && response.status === true) {
        console.log('Receipt saved to database:', response.data);
        return true;
      } else {
        setSaveError(response?.message || 'Failed to save receipt to database');
        return false;
      }
    } catch (error) {
      console.error('Error saving receipt to database:', error);
      setSaveError(error.response?.data?.message || 'Failed to save receipt. Please try again.');
      return false;
    } finally {
      setIsSavingToDatabase(false);
    }
  };

  const numberToWords = (num) => {
    if (!num || isNaN(num)) return '';
    num = Math.floor(num);
    if (num === 0) return 'Zero Only';

    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    const convertBelowHundred = (n) => {
      if (n === 0) return '';
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    };

    const convertBelowThousand = (n) => {
      if (n === 0) return '';
      if (n < 100) return convertBelowHundred(n);
      const hundredPart = Math.floor(n / 100);
      const remainder = n % 100;
      return ones[hundredPart] + ' Hundred' + (remainder ? ' and ' + convertBelowHundred(remainder) : '');
    };

    let result = '';
    let remaining = num;

    if (remaining >= 10000000) {
      const crores = Math.floor(remaining / 10000000);
      result += convertBelowHundred(crores) + ' Crore';
      remaining %= 10000000;
      if (remaining > 0) result += ' ';
    }
    if (remaining >= 100000) {
      const lakhs = Math.floor(remaining / 100000);
      result += convertBelowHundred(lakhs) + ' Lakh';
      remaining %= 100000;
      if (remaining > 0) result += ' ';
    }
    if (remaining >= 1000) {
      const thousands = Math.floor(remaining / 1000);
      result += convertBelowThousand(thousands) + ' Thousand';
      remaining %= 1000;
      if (remaining > 0) result += ' ';
    }
    if (remaining > 0) {
      result += convertBelowThousand(remaining);
    }
    return result + ' Only';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatMonthYear = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric',
    });
  };

  const getPaymentModeIcon = (mode) => {
    switch (mode) {
      case 'Cash':
        return '💵';
      case 'Online (UPI)':
        return '📱';
      case 'Online (Card)':
        return '💳';
      case 'Online (Net Banking)':
        return '🏦';
      case 'Cheque':
        return '📝';
      default:
        return '💰';
    }
  };

  const captureReceiptAsImage = async (format = 'jpeg') => {
    const receiptElement = receiptRef.current;
    if (!receiptElement) {
      throw new Error('Receipt element not found');
    }

    const originalStyle = {
      overflow: receiptElement.style.overflow,
      width: receiptElement.style.width,
      position: receiptElement.style.position,
    };

    receiptElement.style.overflow = 'visible';
    receiptElement.style.width = 'fit-content';
    receiptElement.style.position = 'relative';

    const width = receiptElement.scrollWidth;
    const height = receiptElement.scrollHeight;

    const options = {
      quality: 1.0,
      pixelRatio: 3,
      backgroundColor: '#ffffff',
      cacheBust: true,
      width: width,
      height: height,
      style: {
        margin: '0',
        padding: '0',
        transform: 'none',
        overflow: 'visible'
      },
      skipAutoScale: false,
      preferDimensions: true,
    };

    let dataUrl;
    if (format === 'jpeg') {
      dataUrl = await htmlToImage.toJpeg(receiptElement, options);
    } else {
      dataUrl = await htmlToImage.toPng(receiptElement, options);
    }

    receiptElement.style.overflow = originalStyle.overflow;
    receiptElement.style.width = originalStyle.width;
    receiptElement.style.position = originalStyle.position;

    return dataUrl;
  };

  const sendToWhatsApp = async () => {
    if (!receiptData) {
      alert('Please generate a receipt first');
      return;
    }

    const studentPhone = formData.phone;
    if (!studentPhone) {
      alert('Student phone number is required to send via WhatsApp');
      return;
    }

    let formattedPhone = studentPhone.replace(/\D/g, '');
    if (formattedPhone.length === 10) {
      formattedPhone = '91' + formattedPhone;
    }
    if (!formattedPhone.startsWith('91') && formattedPhone.length === 12) {
      formattedPhone = formattedPhone.substring(0, 2) === '91' ? formattedPhone : '91' + formattedPhone;
    }

    setIsSendingWhatsApp(true);

    try {
      const imageDataUrl = await captureReceiptAsImage('jpeg');

      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], `Receipt_${receiptData.receiptNo}.jpg`, { type: 'image/jpeg' });

      const messageText = `📄 *Fee Payment Receipt - Coder & AccoTax* 📄\n\n` +
        `👤 *Student:* ${receiptData.studentName}\n` +
        `🆔 *Registration No:* ${receiptData.registrationNumber || 'N/A'}\n` +
        `📚 *Course:* ${receiptData.course}\n` +
        `💰 *Amount Paid:* ₹${parseFloat(receiptData.feesPaid).toLocaleString('en-IN')}/-\n` +
        `📅 *Date:* ${receiptData.paymentDate}\n` +
        `🧾 *Receipt No:* ${receiptData.receiptNo}\n` +
        `👨‍💼 *Collected By:* ${getCollectorName()} (${getCollectorDesignation()})\n\n` +
        `Thank you for choosing Coder & AccoTax! ✨\n` +
        `For any queries, contact: +91 70037 56860`;

      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');

      const downloadConfirmed = window.confirm(
        'WhatsApp will open now. Please follow these steps:\n\n' +
        '1. The message text will be pre-filled\n' +
        '2. Click on the attachment (📎) icon\n' +
        '3. Select "Gallery" or "Document"\n' +
        '4. Choose the receipt image you want to send\n\n' +
        'Would you like to download the receipt image now to easily attach it?'
      );

      if (downloadConfirmed) {
        const link = document.createElement('a');
        const fileName = `Receipt_${receiptData.receiptNo}_${receiptData.studentName.replace(/\s/g, '_')}.jpg`;
        link.download = fileName;
        link.href = imageDataUrl;
        link.click();

        setTimeout(() => {
          alert(`✅ Receipt saved as "${fileName}".\n\nPlease attach this image in WhatsApp to complete sending.`);
        }, 500);
      }

    } catch (error) {
      console.error('Error sending to WhatsApp:', error);
      alert('Failed to send receipt via WhatsApp. Please try again or use the Save/Print options.');
    } finally {
      setIsSendingWhatsApp(false);
    }
  };

  const saveAsJPG = async () => {
    if (!receiptData) {
      alert('Please generate a receipt first');
      return;
    }

    setIsSaving(true);

    try {
      const dataUrl = await captureReceiptAsImage('jpeg');

      const link = document.createElement('a');
      const fileName = `Receipt_${receiptData.receiptNo}_${receiptData.studentName.replace(/\s/g, '_')}.jpg`;
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      alert(`Receipt saved successfully as ${fileName}`);
    } catch (error) {
      console.error('Error saving receipt as JPG:', error);
      alert('Failed to save receipt as JPG. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveAsPNG = async () => {
    if (!receiptData) {
      alert('Please generate a receipt first');
      return;
    }

    setIsSaving(true);

    try {
      const dataUrl = await captureReceiptAsImage('png');

      const link = document.createElement('a');
      const fileName = `Receipt_${receiptData.receiptNo}_${receiptData.studentName.replace(/\s/g, '_')}.png`;
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      alert(`Receipt saved successfully as ${fileName}`);
    } catch (error) {
      console.error('Error saving receipt as PNG:', error);
      alert('Failed to save receipt as PNG. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentName || !formData.phone || !formData.course || !formData.paymentDate || !formData.paymentMode) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.feeType === 'monthly') {
      if (!formData.periodFrom || !formData.periodTo || !formData.monthlyFeeAmount) {
        alert('Please fill in period details and monthly fee amount for monthly fee type');
        return;
      }
      if (!formData.feesPaid || parseFloat(formData.feesPaid) <= 0) {
        alert('Please calculate total fees by selecting period and monthly amount');
        return;
      }
    } else {
      if (!formData.feesPaid) {
        alert('Please enter the total fees amount');
        return;
      }
    }

    if (!selectedStudentId) {
      const confirmContinue = window.confirm(
        'Warning: This student is not saved in the database. Receipt will be generated but not saved to database.\n\n' +
        'To save receipts, please select a student from the dropdown or add a new student first.\n\n' +
        'Do you want to continue without saving to database?'
      );
      if (!confirmContinue) {
        return;
      }
    }

    if (!selectedCourseId) {
      const confirmContinue = window.confirm(
        'Warning: This course is not saved in the database. Receipt will be generated but not saved to database.\n\n' +
        'To save receipts, please select a course from the dropdown or add a new course first.\n\n' +
        'Do you want to continue without saving to database?'
      );
      if (!confirmContinue) {
        return;
      }
    }

    let periodText = '';
    let monthlyBreakdown = '';

    if (formData.feeType === 'monthly' && formData.periodFrom && formData.periodTo) {
      const months = calculateMonthsDifference(formData.periodFrom, formData.periodTo);
      const monthlyAmount = parseFloat(formData.monthlyFeeAmount);
      periodText = `${formatMonthYear(formData.periodFrom)} to ${formatMonthYear(formData.periodTo)}`;
      monthlyBreakdown = ` (${months} months × ₹${monthlyAmount.toLocaleString('en-IN')} = ₹${(months * monthlyAmount).toLocaleString('en-IN')})`;
    }

    const receiptNo = generateReceiptNo(
      formData.studentName,
      formData.course,
      formData.paymentDate,
      formData.feesPaid
    );

    setReceiptData({
      studentName: formData.studentName,
      phone: formData.phone,
      course: formData.course,
      feeType: formData.feeType,
      feesPaid: formData.feesPaid,
      monthlyFeeAmount: formData.monthlyFeeAmount,
      paymentDate: formatDate(formData.paymentDate),
      paymentMode: formData.paymentMode,
      period: periodText,
      monthlyBreakdown: monthlyBreakdown,
      receiptNo: receiptNo,
      registrationNumber: formData.registrationNumber,
      collectedBy: getCollectorName(),
      collectorDesignation: getCollectorDesignation(),
    });

    if (selectedStudentId && selectedCourseId) {
      const saved = await saveReceiptToDatabase(receiptNo);
      if (saved) {
        alert('✓ Receipt generated and saved to database successfully!');
      } else {
        alert('⚠️ Receipt generated but failed to save to database. You can still save/print the receipt.');
      }
    }
  };

  const handlePrint = () => {
    if (!receiptData) {
      alert('Please generate a receipt first');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      alert('Please allow pop-ups to print the receipt');
      return;
    }

    const amountInWords = numberToWords(parseFloat(receiptData.feesPaid));
    const paidAmount = parseFloat(receiptData.feesPaid).toLocaleString('en-IN');
    const paymentModeIcon = getPaymentModeIcon(receiptData.paymentMode);
    const currentDateTime = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const logoImgSrc = logoDataUrl || '/assets/cnat.png';
    const paidStampImgSrc = paidStampDataUrl || paidStamp;

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Fee Receipt - Coder & AccoTax</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Times New Roman', Times, serif;
            background: white;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: auto;
          }
          .receipt-container {
            width: 100%;
            max-width: 100%;
            margin: 0;
            position: relative;
            overflow: visible;
          }
          .receipt {
            position: relative;
            background: white;
            border-radius: 0;
            box-shadow: none;
            margin: 0;
            padding: 10px 20px 20px 20px;
            overflow: visible;
            width: 100%;
          }
          .receipt-content {
            padding: 10px;
            position: relative;
            z-index: 1;
            width: 100%;
          }
          
          .header {
            text-align: center;
            border-bottom: 2px solid #1a3e6f;
            padding-bottom: 10px;
            margin-bottom: 12px;
          }
          .organisation-name {
            font-size: 24px;
            font-weight: bold;
            color: #1a3e6f;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }
          .organisation-logo {
            height: 35px;
            width: auto;
            vertical-align: middle;
          }
          .organisation-tagline {
            font-size: 10px;
            color: #4a5568;
            margin-top: 3px;
          }
          .address {
            font-size: 9px;
            color: #4a5568;
            margin-top: 5px;
            line-height: 1.3;
          }
          .contact-row {
            display: flex;
            justify-content: center;
            gap: 15px;
            font-size: 9px;
            color: #4a5568;
            margin-top: 5px;
            flex-wrap: wrap;
          }
          .receipt-title {
            font-size: 14px;
            font-weight: bold;
            color: #2d3748;
            margin-top: 8px;
            background: #f0f4f8;
            display: inline-block;
            padding: 4px 15px;
            border-radius: 20px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: 12px 0;
            padding: 10px;
            background: #f7fafc;
            border-radius: 6px;
          }
          .info-item {
            display: flex;
            flex-direction: column;
          }
          .info-label {
            font-size: 9px;
            font-weight: 600;
            color: #4a5568;
            text-transform: uppercase;
            margin-bottom: 3px;
          }
          .info-value {
            font-size: 11px;
            font-weight: bold;
            color: #2d3748;
            word-break: break-word;
          }
          .details-section {
            margin-bottom: 12px;
          }
          .section-title {
            font-size: 11px;
            font-weight: bold;
            color: #1a3e6f;
            border-left: 3px solid #1a3e6f;
            padding-left: 8px;
            margin-bottom: 8px;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
          }
          .details-table tr {
            border-bottom: 1px solid #e2e8f0;
          }
          .details-table td {
            padding: 6px;
            font-size: 10px;
          }
          .details-table td:first-child {
            font-weight: 600;
            color: #4a5568;
            width: 35%;
          }
          .details-table td:last-child {
            color: #2d3748;
          }
          .fee-section {
            background: #f0f9ff;
            padding: 10px;
            margin: 12px 0;
            border-radius: 6px;
            border: 1px solid #cbd5e0;
          }
          .fee-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
          }
          .fee-label {
            font-weight: bold;
            font-size: 11px;
            color: #4a5568;
          }
          .fee-amount {
            font-weight: bold;
            font-size: 14px;
            color: #2f855a;
          }
          .fee-breakdown {
            font-size: 8px;
            color: #718096;
            margin-top: 5px;
            font-style: italic;
          }
          .amount-words {
            font-size: 8px;
            color: #718096;
            margin-top: 6px;
            padding-top: 6px;
            border-top: 1px dashed #cbd5e0;
            font-style: italic;
          }
          
          .qr-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 12px 0;
            padding: 10px;
            background: #faf5ff;
            border-radius: 6px;
            border: 1px solid #d8b4fe;
          }
          .qr-info {
            flex: 1;
            padding-right: 10px;
          }
          .qr-title {
            font-size: 10px;
            font-weight: bold;
            color: #6b21a5;
            margin-bottom: 5px;
          }
          .qr-text {
            font-size: 8px;
            color: #4a5568;
            margin-bottom: 3px;
          }
          .upi-id {
            font-size: 9px;
            font-weight: bold;
            color: #1a3e6f;
            background: white;
            padding: 3px 6px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 5px;
          }
          .qr-code {
            width: 70px;
            height: 70px;
            object-fit: contain;
          }
          
          .footer {
            text-align: center;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
            margin-top: 10px;
          }
          .signature-area {
            display: flex;
            justify-content: space-between;
            margin: 10px 0 8px;
          }
          .signature-line {
            text-align: center;
            width: 45%;
          }
          .signature-line p:first-child {
            font-size: 8px;
            color: #718096;
            margin-bottom: 5px;
          }
          .signature-line p:last-child {
            font-size: 9px;
            font-weight: 600;
            color: #4a5568;
            border-top: 1px solid #cbd5e0;
            padding-top: 5px;
            display: inline-block;
            min-width: 100px;
          }
          .footer-note {
            font-size: 7px;
            color: #a0aec0;
            margin-top: 6px;
            line-height: 1.3;
          }
          .contact-info {
            margin-top: 8px;
            padding-top: 6px;
            border-top: 1px solid #e2e8f0;
          }
          .contact-info p {
            font-size: 8px;
            color: #4a5568;
            margin-top: 3px;
          }
          .thankyou {
            font-size: 9px;
            font-weight: bold;
            color: #1a3e6f;
            margin-top: 6px;
          }
          .collector-info {
            margin-top: 8px;
            padding: 6px;
            background: #f0fdf4;
            border-radius: 4px;
            font-size: 8px;
            text-align: center;
          }
          .collector-label {
            font-weight: bold;
            color: #166534;
          }
          
          .watermark-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 10;
            opacity: 0.08;
          }
          .watermark-image {
            width: 50%;
            height: auto;
            transform: rotate(-25deg);
          }

          .stamp-container {
            position: absolute;
            top: 55%;
            right: 12%;
            transform: translateY(-50%) rotate(-15deg);
            z-index: 20;
            pointer-events: none;
          }

          .paid-stamp-image {
            width: 120px;
            height: auto;
            opacity: 0.6;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .receipt-container {
              margin: 0;
              padding: 0;
              width: 100%;
            }
            .receipt {
              padding: 0;
              margin: 0;
              width: 100%;
            }
            .stamp-container {
              opacity: 0.7 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .paid-stamp-image {
              opacity: 0.7 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .qr-section {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @page {
              size: A4;
              margin: 0cm;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="receipt">
            <div class="watermark-container">
              <img src="${logoImgSrc}" alt="Watermark" class="watermark-image" />
            </div>
            
            <div class="stamp-container">
              <img src="${paidStampImgSrc}" alt="Paid Stamp" class="paid-stamp-image" />
            </div>
            
            <div class="receipt-content">
              <div class="header">
                <div class="organisation-name">
                  <img src="${logoImgSrc}" alt="Coder & AccoTax Logo" class="organisation-logo" />
                  <span>CODER & ACCOTAX</span>
                </div>
                <div class="organisation-tagline">Quality Education | Professional Training | Tax Solutions</div>
                <div class="address">
                  25(10/A) Shibtala Road, PO-N C Pukur, Barrackpore, Kolkata-700122
                </div>
                <div class="contact-row">
                  <span>📞 +91 70037 56860</span>
                  <span>✉️ info@codernaccotax.co.in</span>
                </div>
                <div>
                  <span class="receipt-title">Fee Payment Receipt</span>
                </div>
              </div>
              
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Registration No.</div>
                  <div class="info-value">${receiptData.registrationNumber || 'N/A'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Receipt No.</div>
                  <div class="info-value">${receiptData.receiptNo}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Payment Date</div>
                  <div class="info-value">${receiptData.paymentDate}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Payment Mode</div>
                  <div class="info-value">${paymentModeIcon} ${receiptData.paymentMode}</div>
                </div>
              </div>

              <div class="details-section">
                <div class="section-title">Student & Course Details</div>
                <table class="details-table">
                  <tr>
                    <td>Student Name</td>
                    <td>${receiptData.studentName}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>${receiptData.phone}</td>
                  </tr>
                  <tr>
                    <td>Course Enrolled</td>
                    <td>${receiptData.course}</td>
                  </tr>
                  ${receiptData.period ? `
                  <tr>
                    <td>Course Period</td>
                    <td>${receiptData.period}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <div class="fee-section">
                <div class="fee-row">
                  <span class="fee-label">Course Fees</span>
                  <span class="fee-amount">₹ ${paidAmount}/-</span>
                </div>
                ${receiptData.monthlyBreakdown ? `
                <div class="fee-breakdown">
                  ${receiptData.monthlyBreakdown}
                </div>
                ` : ''}
                <div class="fee-row">
                  <span class="fee-label">Payment Status</span>
                  <span style="color: #2f855a; font-weight: bold;">✓ PAID IN FULL</span>
                </div>
                <div class="amount-words">
                  Amount in words: Rupees ${amountInWords}
                </div>
              </div>

              <div class="qr-section">
                <div class="qr-info">
                  <div class="qr-title">📱 Pay Online via UPI</div>
                  <div class="qr-text">Scan QR code to make payment</div>
                  <div class="qr-text">Any UPI App (Google Pay, PhonePe, Paytm)</div>
                  <div class="upi-id">UPI ID: 9432456083@upi</div>
                </div>
                <div class="qr-code">
                  <img src="https://quickchart.io/qr?text=upi://pay?pa=9432456083@upi&pn=Coder%20%26%20AccoTax&cu=INR&am=${parseFloat(receiptData.feesPaid)}" alt="UPI QR Code" style="width: 70px; height: 70px;" />
                </div>
              </div>

              <div class="collector-info">
                <span class="collector-label">💰 Collected By:</span> ${receiptData.collectedBy || 'System'} 
                <span style="color: #6b7280;">|</span> 
                <span class="collector-label">📋 Designation:</span> ${receiptData.collectorDesignation || 'Accounts Department'}
                <br/>
                <span style="font-size: 7px; color: #9ca3af;">📅 Printed on: ${currentDateTime}</span>
              </div>

              <div class="footer">
                <div class="signature-area">
                  <div class="signature-line">
                    <p>Student's Signature</p>
                    <p>(Student)</p>
                  </div>
                  <div class="signature-line">
                    <p>Authorized Signatory</p>
                    <p>(Coder & AccoTax)</p>
                  </div>
                </div>
                <div class="footer-note">
                  This is a computer generated receipt - Valid without signature
                </div>
                <div class="contact-info">
                  <p>📞 For any query: <strong>7003756860</strong></p>
                  <p>🌐 Visit us: <strong style="color: #1a3e6f;">www.codernaccotax.co.in</strong></p>
                </div>
                <div class="thankyou">
                  ✨ Thank you for choosing Coder & AccoTax! ✨
                </div>
              </div>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            }, 500);
          };
        <\/script>
      </body>
    </html>
  `);

    printWindow.document.close();
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const previewAmountInWords = receiptData ? numberToWords(parseFloat(receiptData.feesPaid)) : '';
  const previewPaymentModeIcon = receiptData ? getPaymentModeIcon(receiptData.paymentMode) : '';

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4">
        <div className="flex justify-end mb-4 max-w-6xl mx-auto gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg transition border border-gray-200 dark:border-gray-600 text-sm"
          >
            {darkMode ? (
              <>
                <span>☀️</span> Light Mode
              </>
            ) : (
              <>
                <span>🌙</span> Dark Mode
              </>
            )}
          </button>
          {isDevelopment && (
            <button
              onClick={() => setShowDevTools(!showDevTools)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 dark:bg-gray-600 text-white shadow-md hover:shadow-lg transition text-sm"
            >
              <span>🛠️</span> {showDevTools ? 'Hide Dev Tools' : 'Show Dev Tools'}
            </button>
          )}
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📝</span> Student Fee Payment Form
              </h2>
              <p className="text-blue-100 text-xs mt-1">Enter payment details to generate receipt</p>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Student Selection Dropdown */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Select Student (Required for saving)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowNewStudentForm(!showNewStudentForm)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold"
                  >
                    {showNewStudentForm ? '− Cancel' : '+ Add New Student'}
                  </button>
                </div>
                <select
                  value={selectedStudentId}
                  onChange={handleStudentSelect}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition cursor-pointer"
                  disabled={loadingStudents}
                >
                  <option value="">-- Select from database --</option>
                  {students.map((student) => (
                    <option key={student.studentId} value={student.studentId}>
                      {student.studentName} - {student.registrationNumber || 'No Reg No'} - {student.whatsapp || student.phone1}
                    </option>
                  ))}
                </select>
                {loadingStudents && (
                  <p className="text-xs text-gray-500 mt-1">Loading students...</p>
                )}
                {error && (
                  <p className="text-xs text-red-600 mt-1">{error}</p>
                )}
                {students.length === 0 && !loadingStudents && !error && (
                  <p className="text-xs text-yellow-600 mt-1">No students found in database</p>
                )}
              </div>

              {/* New Student Form */}
              {showNewStudentForm && (
                <div className="border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-3">Add New Student</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        name="student_name"
                        value={newStudentData.student_name}
                        onChange={handleNewStudentChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition text-sm"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Nickname (Optional)
                      </label>
                      <input
                        type="text"
                        name="nickname"
                        value={newStudentData.nickname}
                        onChange={handleNewStudentChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition text-sm"
                        placeholder="e.g., Kaustav class 5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={newStudentData.whatsapp}
                        onChange={handleNewStudentChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition text-sm"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    {createStudentError && (
                      <p className="text-xs text-red-600 mt-1">{createStudentError}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleCreateStudent}
                        disabled={isCreatingStudent}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {isCreatingStudent ? 'Creating...' : 'Create Student'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewStudentForm(false);
                          setNewStudentData({ student_name: '', nickname: '', whatsapp: '' });
                          setCreateStudentError(null);
                        }}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 transition text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">OR Enter Manually</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                  placeholder="Enter student name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                  placeholder="10-digit mobile number"
                  required
                />
              </div>

              {/* Course Selection Dropdown with Add New Course */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Course Name (Required for saving) *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowNewCourseForm(!showNewCourseForm)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold"
                  >
                    {showNewCourseForm ? '− Cancel' : '+ Add New Course'}
                  </button>
                </div>
                <select
                  name="course"
                  value={selectedCourseId}
                  onChange={handleCourseSelect}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition cursor-pointer"
                  required
                  disabled={loadingCourses}
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.courseCode} - {course.courseName}
                    </option>
                  ))}
                </select>
                {loadingCourses && (
                  <p className="text-xs text-gray-500 mt-1">Loading courses...</p>
                )}
                {coursesError && (
                  <p className="text-xs text-red-600 mt-1">{coursesError}</p>
                )}
                {courses.length === 0 && !loadingCourses && !coursesError && (
                  <p className="text-xs text-yellow-600 mt-1">No courses found in database</p>
                )}
              </div>

              {/* New Course Form */}
              {showNewCourseForm && (
                <div className="border-2 border-purple-200 dark:border-purple-800 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
                  <h3 className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-3">Add New Course</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Course Code *
                      </label>
                      <input
                        type="text"
                        name="courseCode"
                        value={newCourseData.courseCode}
                        onChange={handleNewCourseChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition text-sm"
                        placeholder="e.g., REACT01, PYTHON01"
                      />
                      <p className="text-xs text-gray-500 mt-1">Unique course identifier (will be converted to uppercase)</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Course Name *
                      </label>
                      <input
                        type="text"
                        name="courseName"
                        value={newCourseData.courseName}
                        onChange={handleNewCourseChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition text-sm"
                        placeholder="e.g., React Development, Python Programming"
                      />
                    </div>
                    {createCourseError && (
                      <p className="text-xs text-red-600 mt-1">{createCourseError}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleCreateCourse}
                        disabled={isCreatingCourse}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {isCreatingCourse ? 'Creating...' : 'Create Course'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewCourseForm(false);
                          setNewCourseData({ courseCode: '', courseName: '' });
                          setCreateCourseError(null);
                        }}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 transition text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Fee Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleFeeTypeChange({ target: { value: 'non_monthly' } })}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${formData.feeType === 'non_monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                      }`}
                  >
                    One-time / Fixed Fee
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFeeTypeChange({ target: { value: 'monthly' } })}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${formData.feeType === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                      }`}
                  >
                    Monthly Fee
                  </button>
                </div>
              </div>

              {formData.feeType === 'monthly' ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Monthly Fee Amount (₹) *
                    </label>
                    <input
                      type="number"
                      name="monthlyFeeAmount"
                      value={formData.monthlyFeeAmount}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                      placeholder="Enter monthly fee amount"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Course Period (Monthly) *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">From</label>
                        <input
                          type="month"
                          name="periodFrom"
                          value={formData.periodFrom}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">To</label>
                        <input
                          type="month"
                          name="periodTo"
                          value={formData.periodTo}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition text-sm"
                          required
                        />
                      </div>
                    </div>
                    {formData.periodFrom && formData.periodTo && formData.monthlyFeeAmount && (
                      <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Total Months: <strong>{calculateMonthsDifference(formData.periodFrom, formData.periodTo)}</strong> |
                          Total Fees: <strong>₹ {(calculateMonthsDifference(formData.periodFrom, formData.periodTo) * (parseFloat(formData.monthlyFeeAmount) || 0)).toLocaleString('en-IN')}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Total Fees Amount (₹) *
                  </label>
                  <input
                    type="number"
                    name="feesPaid"
                    value={formData.feesPaid}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                    placeholder="Enter total fees amount"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Payment Date *
                </label>
                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Payment Mode *
                </label>
                <select
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition cursor-pointer"
                  required
                >
                  <option value="Cash">💵 Cash</option>
                  <option value="Online (UPI)">📱 Online (UPI)</option>
                  <option value="Online (Card)">💳 Online (Card)</option>
                  <option value="Online (Net Banking)">🏦 Online (Net Banking)</option>
                  <option value="Cheque">📝 Cheque</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSavingToDatabase}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSavingToDatabase ? 'Saving to Database...' : 'Generate Receipt →'}
              </button>
              {saveError && (
                <p className="text-xs text-red-600 mt-1 text-center">{saveError}</p>
              )}
            </form>
          </div>

          {/* Receipt Preview Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 flex justify-between items-center flex-wrap gap-2">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🧾</span> Receipt Preview
                </h2>
                <p className="text-green-100 text-xs mt-1">Review before printing or saving</p>
              </div>
              {receiptData && (
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={saveAsJPG}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? '⏳ Saving...' : '📸 Save as JPG'}
                  </button>
                  <button
                    onClick={saveAsPNG}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🖼️ Save as PNG
                  </button>
                  <button
                    onClick={sendToWhatsApp}
                    disabled={isSendingWhatsApp}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingWhatsApp ? '⏳ Sending...' : '💬 Send to WhatsApp'}
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 bg-white text-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold shadow hover:shadow-lg transition"
                  >
                    🖨️ Print
                  </button>
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex items-center justify-center overflow-auto">
              {receiptData ? (
                <div
                  ref={receiptRef}
                  className="w-full max-w-sm mx-auto bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-visible relative"
                  style={{ backgroundColor: '#ffffff', width: '380px' }}
                >
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                    <img
                      src={CNATLogo}
                      alt="Watermark"
                      className="w-48 h-auto transform rotate-[-25deg]"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* PAID Stamp Image */}
                  <div className="absolute top-[60%] right-[40%] transform -translate-y-1/2 rotate-[-15deg] z-20 pointer-events-none">
                    <img
                      src={paidStamp}
                      alt="Paid Stamp"
                      className="w-28 opacity-60"
                    />
                  </div>

                  <div className="p-4 space-y-3 relative z-10">
                    <div className="text-center border-b pb-3">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <img
                          src={CNATLogo}
                          alt="Coder & AccoTax Logo"
                          className="h-8 w-auto"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <h3 className="text-lg font-bold text-blue-700">Coder & AccoTax</h3>
                      </div>
                      <p className="text-[9px] text-gray-500 mt-1">Fee Payment Receipt</p>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-600">Registration No:</span>
                        <span className="text-gray-800 font-mono text-[10px]">{receiptData.registrationNumber || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-600">Receipt No:</span>
                        <span className="text-gray-800 font-mono text-[10px]">{receiptData.receiptNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Date:</span>
                        <span className="text-gray-700">{receiptData.paymentDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Mode:</span>
                        <span className="text-gray-700">{previewPaymentModeIcon} {receiptData.paymentMode}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-gray-600">Student:</span>
                          <span className="text-gray-800 font-medium text-right">{receiptData.studentName}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-gray-600">Phone:</span>
                          <span className="text-gray-700">{receiptData.phone}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-gray-600">Course:</span>
                          <span className="text-gray-700 text-right">{receiptData.course}</span>
                        </div>
                        {receiptData.period && (
                          <div className="flex justify-between mb-1">
                            <span className="font-semibold text-gray-600">Period:</span>
                            <span className="text-gray-700 text-right text-[9px]">{receiptData.period}</span>
                          </div>
                        )}
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg mt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-700">Amount Paid:</span>
                          <span className="font-bold text-green-600 text-base">₹ {parseFloat(receiptData.feesPaid).toLocaleString('en-IN')}</span>
                        </div>
                        {receiptData.monthlyBreakdown && (
                          <div className="text-[8px] text-gray-500 italic mt-1">
                            {receiptData.monthlyBreakdown}
                          </div>
                        )}
                        <div className="text-[8px] text-gray-500 italic mt-2 pt-1 border-t">
                          {previewAmountInWords}
                        </div>
                      </div>
                      
                      {/* Collector Info in Preview */}
                      <div className="bg-gray-50 p-2 rounded-lg mt-2 text-center">
                        <p className="text-[8px] font-semibold text-gray-600">💰 Collected By:</p>
                        <p className="text-[9px] font-bold text-green-700">{receiptData.collectedBy || 'System'}</p>
                        <p className="text-[7px] text-gray-500">{receiptData.collectorDesignation || 'Accounts Department'}</p>
                      </div>
                    </div>

                    <div className="text-center pt-3 border-t">
                      <p className="text-[8px] text-gray-400">✓ Valid without signature</p>
                      <p className="text-[7px] text-gray-400 mt-1">25(10/A) Shibtala Road, Barrackpore, Kol-122</p>
                      <div className="mt-2 pt-2 flex justify-center">
                        <img 
                          src="https://quickchart.io/qr?text=upi://pay?pa=9432456083@upi&pn=Coder%20%26%20AccoTax&cu=INR" 
                          alt="UPI QR Code" 
                          className="w-16 h-16 mx-auto"
                        />
                      </div>
                      <div className="text-[6px] text-gray-400 mt-1">UPI ID: 9432456083@upi</div>
                      <div className="mt-2 pt-1 border-t border-gray-100">
                        <p className="text-[7px] text-gray-500">📞 For any query: <span className="font-semibold text-gray-700">7003756860</span></p>
                        <p className="text-[7px] text-gray-500 mt-0.5">🌐 Visit us: <span className="font-semibold text-blue-600">www.codernaccotax.co.in</span></p>
                      </div>
                      <p className="text-[8px] text-blue-600 mt-2">✨ Thank you! ✨</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">No receipt generated yet</p>
                  <p className="text-xs text-gray-400 mt-1">Fill the form and click "Generate Receipt"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Developer Tools Section - Only visible in development mode */}
      {isDevelopment && showDevTools && (
        <div className="fixed bottom-4 right-4 z-50 w-96 bg-gray-900 text-white rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">🛠️</span>
              <h3 className="font-mono text-sm font-semibold">Developer Tools</h3>
              <span className="text-xs bg-yellow-600 text-gray-900 px-2 py-0.5 rounded">DEV MODE</span>
            </div>
            <button
              onClick={() => setShowDevTools(false)}
              className="text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>
          
          <div className="p-4 space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-gray-300">API Payload (POST /fees-receipts)</label>
                <button
                  onClick={copyPayloadToClipboard}
                  className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded transition flex items-center gap-1"
                >
                  📋 {copySuccess || 'Copy JSON'}
                </button>
              </div>
              <pre className="bg-gray-800 p-3 rounded text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto border border-gray-700">
                {JSON.stringify(getApiPayload(), null, 2)}
              </pre>
            </div>
            
            <div className="border-t border-gray-700 pt-3">
              <div className="text-xs text-gray-400 mb-2">Form Data Summary:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">Student ID:</span>
                  <span className="ml-2 text-green-400">{selectedStudentId || 'Not selected'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Course ID:</span>
                  <span className="ml-2 text-green-400">{selectedCourseId || 'Not selected'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Fee Type:</span>
                  <span className="ml-2 text-yellow-400">{formData.feeType}</span>
                </div>
                <div>
                  <span className="text-gray-400">Amount:</span>
                  <span className="ml-2 text-yellow-400">₹{formData.feesPaid || 0}</span>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-700">
              ⚡ Use this payload to test the API endpoint directly
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentFeeReceiptPart3;