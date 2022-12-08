// Vector class
// Handles two to three dimensional vector mathematics

import { f32 } from "./math";

class Vec3 {
	constructor(
        public x = 0.0, 
        public y = 0.0, 
        public z = 0.0
    ) {}

	static fromArray(array: Array<f32>) {
		switch (array.length) {
			case 0: return new Vec3();
			case 1: return new Vec3(array[0]);
			case 2: return new Vec3(array[0], array[1]);
			default: return new Vec3(array[0], array[1], array[2]);
		}

	}

	static zero() {
		return new Vec3(0.0, 0.0, 0.0);
	}

	static new(x = 0.0, y= 0.0, z = 0.0) {
		return new Vec3(x, y, z);
	}

	static unitX(size: 1.0) {
		return new Vec3(size, 0.0, 0.0);
	}

	static unitY(size: 1.0) {
		return new Vec3(0.0, size, 0.0);
	}

	static unitZ(size: 1.0) {
		return new Vec3(0.0, 0.0, size);
	}

    static fromLerp(v1=Vec3.new(0,0,0), v2=Vec3.new(0,0,0), alpha=0.5) {
        return new Vec3(
            v1.x + (v2.x - v1.x) * alpha,
            v1.y + (v2.y - v1.y) * alpha,
            v1.z + (v2.z - v1.z) * alpha,
        );
    }

	static calculateWheelOrder(vectors=[Vec3.new(0,0,0)], ihat=Vec3.new(0,0,0), jhat=Vec3.new(0,0,0)) {

        let angles = Array<f32>();
        vectors.forEach((v) => {
            angles.push(new Vec3(v.dot(ihat), v.dot(jhat)).angle());
        });

        // @ts-ignore
        let ids = Util.range(vectors.length);
        ids.sort((a:f32, b: f32) => {
            return angles[a] - angles[b];
        });
        return ids;
    }

	angle() {
        // computes the angle in radians with respect to the positive x-axis
        const angle = Math.atan2(-this.y, -this.x) + Math.PI;
        return angle;
    }


	normalize() {
		const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		return new Vec3(this.x / length, this.y / length, this.z / length);
	}


	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}


	distance(vector: Vec3) {
		if (vector.equals(this)) return 0;
		return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y) + (this.z - vector.z) * (this.z - vector.z));
	}


	add(other: Vec3) {
		return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
	}


	subtract(other: Vec3) {
		return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
	}


	multiply(scalar: f32) {
		return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
	}


	scale(scalar: f32) {
		return this.multiply(scalar)
	}


	scaleWithVector(vector: Vec3) {
		return new Vec3(this.x * vector.x, this.y * vector.y, this.z * vector.z);
	}


	inverse() {
		return new Vec3(-this.x, -this.y, -this.z);
	}


	rotate(pivot: Vec3, beta: f32) {
	  let diff = this.add(pivot.inverse());

	  let rotated = new Vec3(
	      Math.cos(beta) * diff.x - Math.sin(beta) * diff.y,
	      Math.sin(beta) * diff.x + Math.cos(beta) * diff.y,
	  );

	  return pivot.add(rotated);
	}


	clone() {
		return new Vec3(this.x, this.y, this.z);
	}


	round() {
		return new Vec3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
	}


	floor() {
		return new Vec3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
	}


	ceil() {
		return new Vec3(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z));
	}


	equals(other: Vec3) {
		return this.x === other.x && this.y === other.y && this.z === other.z;
	}


	dot(other: Vec3) {
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}


	cross(other: Vec3) {
		return new Vec3(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
	}

  
	project(other: Vec3) {
		return other.scale(this.dot(other));
	}

	polarAngles() {
		const normal = new Vec3(0.0, 1.0, 0.0);
		let projection = this.subtract(normal.scale(normal.dot(this)));
		
		const phi = Math.atan2(projection.z, projection.x);
		const phiNormal = new Vec3(Math.cos(phi), 0.0, Math.sin(phi));

		const theta = Math.atan2(normal.dot(this), phiNormal.dot(this));

		return [theta, phi];
	}

	toRadians() {
		return new Vec3(this.x / 180.0 * Math.PI, this.y / 180.0 * Math.PI, this.z / 180.0 * Math.PI);
	}

	toDegrees() {
		return new Vec3(this.x * 180.0 / Math.PI, this.y * 180.0 / Math.PI, this.z * 180.0 / Math.PI);
	}
  
	toArray() {
		return [this.x, this.y, this.z];
	}
}
