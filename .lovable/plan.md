
## Ajuste da Imagem dos Glúteos

### Problema Atual
A imagem dos glúteos está com `scale-125`, mas o topo da imagem não está alcançando o topo do box. A base está correta (rente ao box rosa), mas precisa aumentar o tamanho para que o topo também fique rente.

### Solução

Aumentar o scale da imagem dos glúteos de `scale-125` para `scale-150` (ou mais se necessário). Isso fará com que a imagem fique maior, mantendo a base alinhada ao box rosa (devido ao `items-end` + `object-bottom`) e fazendo o topo alcançar o topo do box.

### Alteração Técnica

**Arquivo:** `src/components/funnel/steps/TargetAreasStep.tsx`

Na linha 19, alterar:
```javascript
// De:
{ id: "glutes", image: targetGlutes, label: "Glúteos", scale: "scale-125", align: "items-end" }

// Para:
{ id: "glutes", image: targetGlutes, label: "Glúteos", scale: "scale-150", align: "items-end" }
```

Se `scale-150` não for suficiente, podemos tentar valores maiores como `scale-[1.75]` ou `scale-[2]` usando classes arbitrárias do Tailwind.
