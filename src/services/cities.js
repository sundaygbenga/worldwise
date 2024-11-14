import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ozzgdstnzxeakopqmyyk.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96emdkc3RuenhlYWtvcHFteXlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODg4MDY4NSwiZXhwIjoyMDM0NDU2Njg1fQ.ArK144uEYdB5GDQri1zpOoJgFKL3Syp1mM7mIl94Soo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
