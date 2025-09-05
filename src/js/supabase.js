// Supabase configuration and client setup
import { createClient } from '@supabase/supabase-js'

// Environment variables (will be replaced during build)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

// Create Supabase client with public read access
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Data fetching functions
export async function getModules() {
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching modules:', error)
    return []
  }
  
  return data || []
}

export async function getModuleBySlug(slug) {
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  
  if (error) {
    console.error('Error fetching module:', error)
    return null
  }
  
  return data
}

export async function getUpcomingEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'upcoming')
    .order('starts_at', { ascending: true })
  
  if (error) {
    console.error('Error fetching events:', error)
    return []
  }
  
  return data || []
}

export async function getObjectives() {
  const { data, error } = await supabase
    .from('objectives')
    .select('*')
    .eq('show_on_home', true)
    .order('id')
  
  if (error) {
    console.error('Error fetching objectives:', error)
    return []
  }
  
  return data || []
}

// Hardcoded objectives data (fallback or primary source)
export const objectivesData = [
  {
    pillar: 'Kurikulum',
    objective: 'Improve members\' musical skills via a structured curriculum and learning facilities.',
    kpi: 'Design a structured, sustainable, and effective Kocheng Klinik system, targeting 80% member satisfaction within one management year.',
    initiative: 'The Catz\' Module',
    target_output: 'At least 4 modules referencing The Real ITBJazz Book.',
    show_on_home: true
  },
  {
    pillar: 'Event',
    objective: 'Improve members\' skills through event-based learning vehicles.',
    kpi: 'Provide effective learning/training opportunities in jazz, targeting 80% member satisfaction within one management year.',
    initiative: 'Kocheng Klinik',
    target_output: 'Hold ≥ 4 internal Kocheng Klinik sessions (aligned with curriculum) and ≥ 1 external session.',
    show_on_home: true
  },
  {
    pillar: 'Mentoring',
    objective: null,
    kpi: null,
    initiative: null,
    target_output: 'Hold ≥ 4 Mentoring sessions aligned with the curriculum.',
    show_on_home: true
  },
  {
    pillar: 'Jam and Jazz',
    objective: 'Enhance music-making experience via active, appreciative, collaborative expression.',
    kpi: null,
    initiative: null,
    target_output: 'Hold ≥ 1 Jam and Jazz event within one management year.',
    show_on_home: true
  }
]

// Placeholder events data
export const placeholderEvents = [
  {
    type: 'Klinik',
    title: 'Kocheng Klinik',
    description: 'Kocheng Klinik sessions are being prepared. Watch this space.',
    status: 'upcoming'
  },
  {
    type: 'Mentoring',
    title: 'Mentoring',
    description: 'Mentoring sessions are in the works. Details soon.',
    status: 'upcoming'
  },
  {
    type: 'Jam and Jazz',
    title: 'Jam and Jazz',
    description: 'Our next Jam and Jazz is brewing. Stay tuned.',
    status: 'upcoming'
  }
]
