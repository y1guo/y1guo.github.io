export default class NBody {
    constructor(mass, pos, vel) {
        this.num = mass.length;
        this.mass = mass;
        this.pos = pos;
        this.vel = vel;
        console.assert(
            pos.length == this.num * 3,
            "[Error] NBody: position and mass do not match!"
        );
        console.assert(
            vel.length == this.num * 3,
            "[Error] NBody: velocity and mass do not match!"
        );
        this.algo = "leapfrog";
    }

    update(deltaTime) {
        console.assert(deltaTime != undefined);
        if (this.algo == "leapfrog") {
            this.leapfrog(deltaTime);
        } else {
            console.log("[Error] NBody: Wrong algorithm!");
        }
    }

    leapfrog(deltaTime) {
        function advanceVelocity(nbody, dt) {
            for (let i = 0; i < nbody.num; i++) {
                for (let j = i + 1; j < nbody.num; j++) {
                    const dx = [0, 0, 0];
                    for (let k = 0; k < 3; k++) {
                        dx[k] = nbody.pos[3 * i + k] - nbody.pos[3 * j + k];
                    }

                    let tmp = Math.pow(1, 2); // softening
                    for (let k = 0; k < 3; k++) {
                        tmp += dx[k] * dx[k];
                    }
                    const r = Math.sqrt(tmp);

                    const factor = -dt / Math.pow(r, 3);
                    const ci = factor * nbody.mass[j];
                    const cj = factor * nbody.mass[i];

                    for (let k = 0; k < 3; k++) {
                        nbody.vel[3 * i + k] += dx[k] * ci;
                        nbody.vel[3 * j + k] -= dx[k] * cj;
                    }
                }
            }
        }
        function advancePosition(nbody, dt) {
            for (let i = 0; i < nbody.num; i++) {
                for (let j = 0; j < 3; j++) {
                    nbody.pos[3 * i + j] += nbody.vel[3 * i + j] * dt;
                }
            }
        }
        const t_start = window.performance.now();
        advancePosition(this, deltaTime / 2);
        advanceVelocity(this, deltaTime);
        advancePosition(this, deltaTime / 2);
        const t_end = window.performance.now();
        console.log("physics:", Math.round(t_end - t_start), "ms");
    }
}
