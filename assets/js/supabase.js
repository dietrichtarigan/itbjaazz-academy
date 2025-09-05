// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR-PROJECT.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR-ANON-PUBLIC-KEY';

// Initialize Supabase client
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other modules
window.supabase = supabase;

// Utility functions for data fetching
export const fetchModules = async () => {
    try {
        const { data, error } = await supabase
            .from('modules')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching modules:', error);
        return [];
    }
};

export const fetchModuleBySlug = async (slug) => {
    try {
        const { data, error } = await supabase
            .from('modules')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'published')
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching module:', error);
        return null;
    }
};

export const fetchEvents = async () => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('status', 'upcoming')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
};

export const fetchObjectives = async () => {
    try {
        const { data, error } = await supabase
            .from('objectives')
            .select('*')
            .eq('show_on_home', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching objectives:', error);
        return [];
    }
};
