
async function run() {
	const data = await fetch('https://ksense-code-challange.space-monkeys.workers.dev/secret?secret=code-challenge').then((res) =>
		res.text(),
	);

	let gridData = data
		.split('\n')
		.map((line) => {
			const [rowd, columnd, char] = line.split(' ');
			const x = parseInt(columnd?.replace('column=', '').replace(':', '').trim() ?? '');
			const y = parseInt(rowd?.replace('row=', '').trim() ?? '');
			return {
				x,
				y,
				ch: char?.trim() ?? '',
			};
		})
		.filter((p) => Boolean(p.ch));

	const gridSize = findGridSize(gridData);

	const grid = Array.from({ length: gridSize.r }, (e) => Array(gridSize.c).fill(' '));

	for (let point of gridData) {
		let flipedY = gridSize.r - point.y;
		grid[flipedY][point.x] = point.ch;
	}
	const message = grid.map((cols) => cols.join('')).join('\n');
	console.log(message);
}
run();

function findGridSize(data: { x: number; y: number; ch: string }[]): { r: number; c: number } {
	let r = 0;
	let c = 0;

	for (let item of data) {
		if (r < item.y) {
			r = item.y;
		}
		if (c < item.x) {
			c = item.x;
		}
	}
	return { r, c };
}
