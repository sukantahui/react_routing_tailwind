import React, { useEffect, useState } from 'react';

import COutputPracticeTemplate from '../../../COutputPracticeTemplate';
import cData from './topic13_files/outpur-practice1.json';

export default function CProjectsPage() {
    return <COutputPracticeTemplate data={cData} />;
}