//ref: https://stackoverflow.com/questions/11851276/three-js-ellipse ; For ellipse
//ref: threejs.org ; For everything else
function init() {
    var stats = initStats();
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0057B8);

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    //create render and set size
    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;


    var loader = new THREE.TextureLoader();
    var texture1 = loader.load("fur.jpg");
    var tanTexture = loader.load("tanfur.jpg");
    var blackTexture = loader.load("black.jpg");
    var mainColor = loader.load("pupil.jpg");
    var cornea = loader.load("tan.jpg");

    var headGeom = new THREE.SphereGeometry(8, 32, 32, 6, 6.3, 6, 6.3);
    var headMat = new THREE.MeshPhongMaterial({
        map: mainColor,
    });
    var head = new THREE.Mesh(headGeom, headMat);

    var LeftEye = createSclera(new THREE.SphereGeometry(1, 32, 32, 6, 6.3, 6, 6.3));
    LeftEye.position.y = 4;
    LeftEye.position.x = -2;
    LeftEye.position.z = 6.2;
    scene.add(LeftEye);

    var rightEye = createSclera(new THREE.SphereGeometry(1, 32, 32, 6, 6.3, 6, 6.3));
    rightEye.position.y = 4;
    rightEye.position.x = 2;
    rightEye.position.z = 6.2;
    scene.add(rightEye);

    var corneaGeom = new THREE.SphereGeometry(.59, 32, 32, 6, 6.3, 6, 6.3);
    var corneaMat = new THREE.MeshPhongMaterial({
        map: cornea
    });
    var rightCornea = new THREE.Mesh(corneaGeom, corneaMat);
    rightCornea.position.y = 4;
    rightCornea.position.x = 2;
    rightCornea.position.z = 6.78;
    scene.add(rightCornea);
    var leftCornea = new THREE.Mesh(corneaGeom, corneaMat);
    leftCornea.position.y = 4;
    leftCornea.position.x = -2;
    leftCornea.position.z = 6.78;
    scene.add(leftCornea);

    var leftPupil = createPupil(new THREE.SphereGeometry(.29, 32, 32, 6, 6.3, 6, 6.3));
    leftPupil.position.y = 4.025;
    leftPupil.position.x = -2;
    leftPupil.position.z = 7.21;
    scene.add(leftPupil);

    var rightPupil = createPupil(new THREE.SphereGeometry(.29, 32, 32, 6, 6.3, 6, 6.3));
    rightPupil.position.y = 4.025;
    rightPupil.position.x = 2;
    rightPupil.position.z = 7.21;
    scene.add(rightPupil);

    const muzzleGeometry = new THREE.CylinderGeometry(4.2, 1, 3, 64, 64);
    const muzzleMaterial = new THREE.MeshPhongMaterial({
        map: tanTexture
    });
    const muzzle = new THREE.Mesh(muzzleGeometry, muzzleMaterial);
    muzzle.rotation.x = Math.PI / -2;
    muzzle.rotation.y = Math.PI; //rotate this to hide the cone seam
    muzzle.position.z = 8;
    muzzle.position.y = 0;
    scene.add(muzzle);

    var noseGeom = new THREE.SphereGeometry(1.3, 32, 32, 6, 6.3, 6, 6.3);
	var noseMat = new THREE.MeshPhongMaterial({
		map: blackTexture,
		});
	const nose = new THREE.Mesh(noseGeom, noseMat);	
    nose.position.y = 0;
    nose.position.x = 0;
    nose.position.z = 9.1;
    scene.add(nose);

    const nose2geometry = new THREE.TorusGeometry(1, 0.4, 30, 200, 100);
    const nose2Material = new THREE.MeshPhongMaterial({
        map: blackTexture,
		});
    const nose2 = new THREE.Mesh(nose2geometry, nose2Material);
    nose2.position.z = 9;
    scene.add(nose2);

    const smileGeometry = new THREE.TorusGeometry(1.2, 0.5, 30, 200, 3.2);
    const smileMaterial = new THREE.MeshPhongMaterial({
        map: blackTexture
    });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.z = 8.27;
    smile.position.y = -1.5;
    smile.rotation.x = Math.PI;
    scene.add(smile);
    scene.add(head);

    const lidGeometry = new THREE.TorusGeometry(1, 0.4, 30, 200, 100);
    const lidMaterial = new THREE.MeshPhongMaterial({
        map: texture1
    });
    const upperRightLid = new THREE.Mesh(lidGeometry, lidMaterial);
    upperRightLid.position.y = 4;
    upperRightLid.position.x = -2;
    upperRightLid.position.z = 6;
    scene.add(upperRightLid);
    const upperLeftLid = new THREE.Mesh(lidGeometry, lidMaterial);
    upperLeftLid.position.y = 4;
    upperLeftLid.position.x = 2;
    upperLeftLid.position.z = 6;
    scene.add(upperLeftLid);
    const lowerRightLid = new THREE.Mesh(lidGeometry, lidMaterial);
    lowerRightLid.position.y = 4;
    lowerRightLid.position.x = -2;
    lowerRightLid.position.z = 6.4;
    scene.add(lowerRightLid);
    const lowerLeftLid = new THREE.Mesh(lidGeometry, lidMaterial);
    lowerLeftLid.position.y = 4;
    lowerLeftLid.position.x = 2;
    lowerLeftLid.position.z = 6.4;
    scene.add(lowerLeftLid);

    const earGeometry = new THREE.TorusGeometry(2.5, 0.9, 30, 200, 100);
    const earMaterial = new THREE.MeshPhongMaterial({
        map: texture1
    });
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.x = -7;
    leftEar.position.y = 6;
    scene.add(leftEar);
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.x = 7;
    rightEar.position.y = 6;
    scene.add(rightEar);

    const innerEarGeometry = new THREE.PlaneGeometry(4, 3.2, 100, 100);
    const innerEarMaterial = new THREE.MeshBasicMaterial({
        map: tanTexture,
        side: THREE.DoubleSide
    });
    const earPieces = new THREE.Mesh(innerEarGeometry, innerEarMaterial);
    earPieces.position.x = -7.4;
    earPieces.position.y = 6;
    scene.add(earPieces);
    const otherEarPiece = earPieces.clone();
    otherEarPiece.position.x = 7.4;
    scene.add(otherEarPiece);

    const behindEarGeometry = new THREE.PlaneGeometry(4, 3.2, 100, 100);
    const behindEarMaterial = new THREE.MeshPhongMaterial({
        map: texture1,
        side: THREE.DoubleSide
    });
    const behindEarPiece = new THREE.Mesh(behindEarGeometry, behindEarMaterial);
    behindEarPiece.position.x = -7.4;
    behindEarPiece.position.y = 6;
    behindEarPiece.position.z = -.01;
    scene.add(behindEarPiece);
    const otherBehindEarPiece = behindEarPiece.clone();
    otherBehindEarPiece.position.x = 7.4;
    scene.add(otherBehindEarPiece);

    camera.position.x = 00;
    camera.position.y = 2;
    camera.position.z = 28;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var control;
    control = new THREE.OrbitControls(camera);
    control.addEventListener('change', render);


    var ambiLight = new THREE.AmbientLight(0x404040);
    scene.add(ambiLight);
    var light = new THREE.DirectionalLight();
    light.position.set(10, 100, 100);
    scene.add(light);


    var controls = new function() {
        this.perspective = "Perspective";
        this.switchCamera = function() {
            if (camera instanceof THREE.PerspectiveCamera) {
                camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
                camera.position.x = 120;
                camera.position.y = 60;
                camera.position.z = 180;
                camera.lookAt(scene.position);
                this.perspective = "Orthographic";
            } else {
                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.x = 00;
                camera.position.y = 2;
                camera.position.z = 28;
                camera.lookAt(scene.position);
                this.perspective = "Perspective";
            }
        };
        this.MainHue = headMat.color.getStyle();
        this.SecondaryHue = muzzleMaterial.color.getStyle();
        this.EyeHue = corneaMat.color.getStyle();
    };
    var gui = new dat.GUI();
    gui.add(controls, 'switchCamera');
    gui.add(controls, 'perspective').listen();
    gui.addColor(controls, 'MainHue').onChange(function(e) {
        headMat.color.setStyle(e);
        earMaterial.color.setStyle(e);
        lidMaterial.color.setStyle(e);
    });
    gui.addColor(controls, 'SecondaryHue').onChange(function(e) {
        muzzleMaterial.color.setStyle(e);
        innerEarMaterial.color.setStyle(e);
    });
    gui.addColor(controls, 'EyeHue').onChange(function(e) {
        corneaMat.color.setStyle(e);
    });


    camera.lookAt(scene.position);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);
    render();

    function createSclera(geom) {
        var texLoader = new THREE.TextureLoader();
        var texture = texLoader.load("sclera2.jpg");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = texture;

        var mesh = new THREE.Mesh(geom, mat);
        return mesh;
    }

    function createPupil(geom) {
        var texLoader = new THREE.TextureLoader();
        var texture = texLoader.load("pupil.jpg");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = texture;

        var mesh = new THREE.Mesh(geom, mat);
        return mesh;
    }

    function render() {
        stats.update();
        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
    }

    function initStats() {
        var stats = new Stats();

        stats.setMode(0);

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.getElementById("Stats-output").appendChild(stats.domElement);

        return stats;
    }
}

window.onload = init;