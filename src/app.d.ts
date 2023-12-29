// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: import("@supabase/supabase-js").Session | null;
		}
	// interface Error {}
	// interface Platform {}
}
