'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, AlertCircle, Trash2, Info, Wind, Droplets, Flame, Flower, Leaf, BookOpen, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from './Button';
import { OpenAIService } from '../services/openai';
import { MemoryService } from '../services/memoryService';

// ... rest of the existing Chat component code ... 