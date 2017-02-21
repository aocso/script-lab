declare let PLAYGROUND: IEnvironment;

let { devMode, build, config } = PLAYGROUND as IEnvironment;
let environment: IEnvironmentConfig;

if (devMode) {
    environment = config['local'];
}
else {
    let {origin} = location;
    if (/insiders/.test(origin)) {
        environment = config['insiders'];
    }
    else if (/edge/.test(origin)) {
        environment = config['edge'];
    }
    else {
        environment = config['production'];
    }
}

const banner =
    `....###....########..########..........####.##....##....########..##..........###....##....##..######...########...#######..##.....##.##....##.########.
...##.##...##.....##.##.....##..........##..###...##....##.....##.##.........##.##....##..##..##....##..##.....##.##.....##.##.....##.###...##.##.....##
..##...##..##.....##.##.....##..........##..####..##....##.....##.##........##...##....####...##........##.....##.##.....##.##.....##.####..##.##.....##
.##.....##.##.....##.##.....##.#######..##..##.##.##....########..##.......##.....##....##....##...####.########..##.....##.##.....##.##.##.##.##.....##
.#########.##.....##.##.....##..........##..##..####....##........##.......#########....##....##....##..##...##...##.....##.##.....##.##..####.##.....##
.##.....##.##.....##.##.....##..........##..##...###....##........##.......##.....##....##....##....##..##....##..##.....##.##.....##.##...###.##.....##
.##.....##.########..########..........####.##....##....##........########.##.....##....##.....######...##.....##..#######...#######..##....##.########.`;

console.groupCollapsed('About');
console.log(banner);
console.log(build);
console.groupEnd();

export const Environment = {
    devMode,
    build,
    config: environment,
    host: null,
    platform: null
};
