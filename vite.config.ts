import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { getConfig } from '@acaldas/powerhouse';
import { readdirSync } from 'node:fs';

const { documentModelsDir, editorsDir } = getConfig();

const entry = {
    index: 'index.ts',
    documentModels: resolve(documentModelsDir, 'index.ts'),
    editors: resolve(editorsDir, 'index.ts'),
};

readdirSync(documentModelsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .forEach(name => {
        entry[name] = resolve(documentModelsDir, name, 'index.ts');
    });

export default defineConfig(({ mode }) => {
    const external = [
        'document-model',
        'document-model/document',
        'react',
        'react/jsx-runtime',
        'react-dom',
    ];

    return {
        build: {
            outDir: `dist`,
            emptyOutDir: true,
            lib: {
                entry,
                formats: ['es', 'cjs'],
                fileName: (format, entryName) =>
                    `${entryName}.${format === 'cjs' ? 'cjs' : 'js'}`,
            },
            rollupOptions: {
                external,
                output: {
                    exports: 'named',
                },
            },
            commonjsOptions: {
                include: [],
            },
        },
        optimizeDeps: {
            disabled: false,
        },
        plugins: [dts({ insertTypesEntry: true })],
        define: {
            'process.env.NODE_ENV': JSON.stringify(mode),
            __vite_process_env_NODE_ENV: JSON.stringify(mode),
        },
    };
});