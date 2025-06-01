import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { jobRole, difficulty } = await req.json();

    // In a real implementation, this would use OpenAI API to generate questions
    // For now, we'll create some sample questions
    const questions = [
      {
        job_role: jobRole,
        difficulty,
        question: `What are the key considerations when designing a scalable system for ${jobRole}?`,
        category: 'System Design',
        is_ai_generated: true
      },
      {
        job_role: jobRole,
        difficulty,
        question: `How do you approach testing and quality assurance in your role as a ${jobRole}?`,
        category: 'Technical',
        is_ai_generated: true
      },
      {
        job_role: jobRole,
        difficulty,
        question: `Describe a challenging project you worked on as a ${jobRole} and how you overcame obstacles.`,
        category: 'Behavioral',
        is_ai_generated: true
      }
    ];

    // Insert questions into the database
    const { data, error } = await supabase
      .from('questions')
      .insert(questions)
      .select();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, questions: data }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});