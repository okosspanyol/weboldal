export function load({ locals }) {
	// Az admin a saját (friss) tartalmát tölti be, a nyilvános oldal a gyorsítótárazottat.
	return { tartalom: locals.tartalom };
}
