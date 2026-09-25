import { tartalomFrissen, vanElozo } from '$lib/server/tarolo';

export async function load({ platform }) {
	const [betoltott, elozo] = await Promise.all([tartalomFrissen(platform), vanElozo(platform)]);
	return {
		...betoltott,
		vanElozo: elozo,
		vanAdatbazis: !!platform?.env?.DB
	};
}
