// components/courses/constants.js

// Images: from components/courses/ -> go up two levels to assets/
import javaImg from '@assets/course-images/java-logo.svg';
import reactImg from '@assets/course-images/react-logo.svg';
import pythonImg from '@assets/course-images/python-logo.svg';
import clanguage from '@assets/course-images/clanguage.svg';
import dsa from '@assets/course-images/dsa.svg';
import sql from '@assets/course-images/sql.svg';
import mysql from '@assets/course-images/mysql.svg';
import databaselabs from '@assets/course-images/database-labs.svg';
import databaseServer from '@assets/course-images/databaseServer.svg';
import defaultImg from '@assets/course-images/default-logo.svg';
import webDevImg from '@assets/group-images/webdev.logo.svg';
import codeImg from '@assets/group-images/code.logo.svg';
import excelImg from '@assets/group-images/excel.logo.svg';
import taxImg from '@assets/group-images/tax.logo.svg';
import hardwareImg from '@assets/group-images/hardware.logo.svg';
import programmingImg from '@assets/group-images/programming.logo.svg';
import accountsImg from '@assets/group-images/accounts.logo.svg';
import dataanalysisImg from '@assets/group-images/dataanalysis.logo.svg';
import studentImg from '@assets/group-images/student.logo.svg';


export const imageMap = {
  javaImg,
  reactImg,
  pythonImg,
  clanguage,
  dsa,
  sql,
  mysql,
  databaselabs,
  databaseServer,
  defaultImg,
  webDevImg,
  codeImg,
  excelImg,
  taxImg,
  hardwareImg,
  programmingImg,
  accountsImg,
  dataanalysisImg,
  studentImg,
};

export const smoothEase = [0.25, 0.1, 0.25, 1];

export const whatsappNumber = "919432456083";

export const encodeWhatsAppMessage = (title) =>
  encodeURIComponent(
    `Hi, I'm interested in the "${title}" course. Could you please share duration, fee details, and admission info?`
  );

export const renderBold = (text) => {
  if (!text) return null;
  const html = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};