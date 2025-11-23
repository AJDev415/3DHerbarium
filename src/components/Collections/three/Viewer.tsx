'use client'

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js"

// ...existing code...
type ViewerProps = {
    objUrl: string;
    mtlUrl: string;
    width?: string | number;
    height?: string | number;
    background?: number;
};

const clamp = (v: number, a = 0.5, b = 2) => Math.max(a, Math.min(b, v))

// ...existing code...
const Viewer: React.FC<ViewerProps> = ({
    objUrl,
    mtlUrl,
    width = "100%",
    height = "100%",
    background = 0x000000,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const frameIdRef = useRef<number | null>(null)

    // Loading state for progress bar
    const [isLoading, setIsLoading] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)

    useEffect(() => {
        if (!containerRef.current) return

        let canceled = false
        setIsLoading(true)
        setLoadingProgress(0)

        const container = containerRef.current
        const w = container.clientWidth || 400
        const h = container.clientHeight || 400

        if (container.clientWidth === 0 || container.clientHeight === 0) {
            console.warn('Viewer: container has zero size. Ensure parent has a height or set Viewer height.', {
                clientWidth: container.clientWidth,
                clientHeight: container.clientHeight,
            });
        }
        console.debug('Viewer init', { w, h, objUrl })

        // Scene + camera
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(background)

        const camera = new THREE.PerspectiveCamera(
            45,
            w / h,
            0.1,
            1000
        );

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(clamp(window.devicePixelRatio));
        renderer.setSize(w, h);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.07;

        // Lights
        const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        hemi.position.set(0, 200, 0);
        scene.add(hemi);

        const dir = new THREE.DirectionalLight(0xffffff, 0.8);
        dir.position.set(5, 10, 7.5);
        dir.castShadow = true;
        scene.add(dir);

        // Load OBJ with MTL
        const mtlLoader = new MTLLoader()
        let objRoot: THREE.Object3D | null = null;

        mtlLoader.load(mtlUrl, (materials) => {
            if (canceled) return
            materials.preload()

            const loader = new OBJLoader()
            loader.setMaterials(materials)

            loader.load(objUrl, (object) => {
                if (canceled) return
                objRoot = object

                scene.add(object);

                // Fit camera to object
                const box = new THREE.Box3().setFromObject(object);
                const size = new THREE.Vector3();
                box.getSize(size);
                const center = new THREE.Vector3();
                box.getCenter(center);

                const maxSize = Math.max(size.x, size.y, size.z);
                const fitDistance = maxSize * 1.8;
                const direction = new THREE.Vector3(0, 0, 1);
                camera.position.copy(center).add(direction.multiplyScalar(fitDistance));
                camera.near = Math.max(0.1, maxSize / 100);
                camera.far = fitDistance * 10;
                camera.updateProjectionMatrix();

                controls.target.copy(center);
                controls.update();

                if (!canceled) {
                    setLoadingProgress(100)
                    // slight delay so users see completion
                    setTimeout(() => { if (!canceled) setIsLoading(false) }, 200)
                }
            },
                (xhr) => {
                    if (canceled) return
                    if (xhr.lengthComputable) {
                        const percent = Math.round((xhr.loaded / xhr.total) * 100)
                        setLoadingProgress(percent)
                    }
                },
                (error) => {
                    console.error("Error loading OBJ:", error);
                    if (!canceled) setIsLoading(false)
                }
            );
        },
            undefined,
            (err) => {
                console.error("Error loading MTL:", err)
                if (!canceled) setIsLoading(false)
            }
        )

        // Handle resize
        const onWindowResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth || 300;
            const h = containerRef.current.clientHeight || 300;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            renderer.setPixelRatio(clamp(window.devicePixelRatio));
        };
        window.addEventListener("resize", onWindowResize);

        // Animation loop
        const animate = () => {
            controls.update();
            renderer.render(scene, camera);
            frameIdRef.current = requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            canceled = true
            if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
            window.removeEventListener("resize", onWindowResize);
            controls.dispose();
            if (objRoot) {
                scene.remove(objRoot);
                objRoot.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh;
                        if (Array.isArray(mesh.material)) {
                            mesh.material.forEach((m) => m.dispose && m.dispose());
                        } else {
                            mesh.material && (mesh.material as THREE.Material).dispose && (mesh.material as THREE.Material).dispose();
                        }
                        mesh.geometry && mesh.geometry.dispose && mesh.geometry.dispose();
                    }
                });
            }
            renderer.dispose();
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
            rendererRef.current = null;
            // ensure loading state cleared on unmount
            setIsLoading(false)
        };
    }, [objUrl, mtlUrl, background]);

    // container/minHeight calculation kept as before
    const minH = typeof height === "number" ? `${height}px` : height

    return (
        <div style={{ position: "relative", width, height }}>
            <div
                ref={containerRef}
                style={{
                    width: "100%",
                    height: "100%",
                    minHeight: minH,
                    display: "block",
                    position: "relative",
                    overflow: "hidden",
                }}
            />
            {isLoading && (
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 6,
                        background: "rgba(0,0,0,0.12)",
                        zIndex: 50,
                    }}
                >
                    <div
                        style={{
                            width: `${loadingProgress}%`,
                            height: "100%",
                            background: "#29a3ff",
                            transition: "width 120ms linear",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Viewer;
// ...existing code...