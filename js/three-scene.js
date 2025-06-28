document.addEventListener('DOMContentLoaded', () => {
   const container = document.getElementById('three-canvas-container');
   if (!container) return;

   // 1. Сцена и Камера
   const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
   camera.position.set(0, 5, 20); // Позиция камеры

   // 2. Рендерер
   const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
   renderer.setSize(container.clientWidth, container.clientHeight);
   renderer.setPixelRatio(window.devicePixelRatio);
   container.appendChild(renderer.domElement);

   // 3. Создание "Архитектурной Сетки"
   const gridHelper = new THREE.GridHelper(
       200, // Размер сетки
       50, // Количество делений
       0xaaaaaa, // Цвет основных линий
       0x555555  // Цвет вспомогательных линий
   );
   gridHelper.material.opacity = 0.15; // Делаем сетку очень бледной
   gridHelper.material.transparent = true;
   scene.add(gridHelper);

   // 4. Создание "Статичных Звезд" для глубины
   const starVertices = [];
   for (let i = 0; i < 500; i++) {
       const x = (Math.random() - 0.5) * 500;
       const y = (Math.random() - 0.5) * 500;
       const z = (Math.random() - 0.5) * 500;
       starVertices.push(x, y, z);
   }
   const starGeometry = new THREE.BufferGeometry();
   starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
   const starMaterial = new THREE.PointsMaterial({
       color: 0x888888,
       size: 0.1,
       transparent: true,
       opacity: 0.5
   });
   const stars = new THREE.Points(starGeometry, starMaterial);
   scene.add(stars);


   // 5. Интерактивность с мышью
   let mouseX = 0;
   let mouseY = 0;
   document.addEventListener('mousemove', (event) => {
       mouseX = (event.clientX / window.innerWidth) * 2 - 1;
       mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
   });

   // 6. Анимация
   const clock = new THREE.Clock();
   function animate() {
       requestAnimationFrame(animate);
       const elapsedTime = clock.getElapsedTime();

       // Очень медленное вращение сетки для создания атмосферы
       gridHelper.rotation.y = elapsedTime * 0.03;

       // Плавное смещение камеры вслед за мышью
       camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
       camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
       camera.lookAt(scene.position);

       renderer.render(scene, camera);
   }
   animate();

   // 7. Адаптивность
   window.addEventListener('resize', () => {
       camera.aspect = container.clientWidth / container.clientHeight;
       camera.updateProjectionMatrix();
       renderer.setSize(container.clientWidth, container.clientHeight);
   });
});document.addEventListener('DOMContentLoaded', () => {
   const container = document.getElementById('three-canvas-container');
   if (!container) return;

   // 1. Сцена и Камера
   const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
   camera.position.set(0, 5, 20); // Позиция камеры

   // 2. Рендерер
   const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
   renderer.setSize(container.clientWidth, container.clientHeight);
   renderer.setPixelRatio(window.devicePixelRatio);
   container.appendChild(renderer.domElement);

   // 3. Создание "Архитектурной Сетки"
   const gridHelper = new THREE.GridHelper(
       200, // Размер сетки
       50, // Количество делений
       0xaaaaaa, // Цвет основных линий
       0x555555  // Цвет вспомогательных линий
   );
   gridHelper.material.opacity = 0.15; // Делаем сетку очень бледной
   gridHelper.material.transparent = true;
   scene.add(gridHelper);

   // 4. Создание "Статичных Звезд" для глубины
   const starVertices = [];
   for (let i = 0; i < 500; i++) {
       const x = (Math.random() - 0.5) * 500;
       const y = (Math.random() - 0.5) * 500;
       const z = (Math.random() - 0.5) * 500;
       starVertices.push(x, y, z);
   }
   const starGeometry = new THREE.BufferGeometry();
   starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
   const starMaterial = new THREE.PointsMaterial({
       color: 0x888888,
       size: 0.1,
       transparent: true,
       opacity: 0.5
   });
   const stars = new THREE.Points(starGeometry, starMaterial);
   scene.add(stars);


   // 5. Интерактивность с мышью
   let mouseX = 0;
   let mouseY = 0;
   document.addEventListener('mousemove', (event) => {
       mouseX = (event.clientX / window.innerWidth) * 2 - 1;
       mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
   });

   // 6. Анимация
   const clock = new THREE.Clock();
   function animate() {
       requestAnimationFrame(animate);
       const elapsedTime = clock.getElapsedTime();

       // Очень медленное вращение сетки для создания атмосферы
       gridHelper.rotation.y = elapsedTime * 0.03;

       // Плавное смещение камеры вслед за мышью
       camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
       camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
       camera.lookAt(scene.position);

       renderer.render(scene, camera);
   }
   animate();

   // 7. Адаптивность
   window.addEventListener('resize', () => {
       camera.aspect = container.clientWidth / container.clientHeight;
       camera.updateProjectionMatrix();
       renderer.setSize(container.clientWidth, container.clientHeight);
   });
});