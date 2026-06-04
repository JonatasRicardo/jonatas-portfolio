# Posts 02–09 · Grade Instagram

Pacote com 7 carrosséis renderizados em PNG e 1 roteiro de Reel.

## Arquivos

- `index.html`: prévia navegável de todos os carrosséis.
- `panel.html`: painel estilo perfil do Instagram, com modal de carrossel ao clicar nas capas.
- `out/panel-preview.png`: imagem rápida do painel.
- `out/post-XX/slide-YY.png`: imagens prontas para postagem.
- `out/post-08/cover.png`: capa 4:5 do Reel para visualizar na grade.
- `assets/backgrounds/post-XX-bg.png`: backgrounds realistas finais, em 2160x2700.
- `assets/backgrounds/raw/post-XX-bg.png`: imagens brutas geradas antes do crop/resample.
- `captions/post-XX.txt`: legenda e hashtags de cada carrossel.
- `reel/post-08-roteiro.md`: roteiro, legenda, hashtags e checklist do Reel.
- `render-posts.mts`: fonte TypeScript para editar copy, cor e layout.

## Posts

- Post 02 · Dor: Tá no link da bio (6 slides)
- Post 03 · Educação: Site bonito x site que vende (6 slides)
- Post 04 · Prova: 15 anos, 5 lições (7 slides)
- Post 05 · Dor: O negócio para quando você para (6 slides)
- Post 06 · Educação: Catálogo no Insta não é loja (6 slides)
- Post 07 · Educação: IA não é robô sem graça (6 slides)
- Post 09 · Dor: Pedido no caderno, pagamento no print (6 slides)
- Post 08 · Prova: antes x depois (Reel)

## Ordem sugerida

Depois do post fixado:

1. Post 02 · Dor · Tá no link da bio
2. Post 03 · Educação · Site bonito x site que vende
3. Post 04 · Prova · 15 anos, 5 lições
4. Post 05 · Dor · O negócio para quando você para
5. Post 06 · Educação · Catálogo no Insta não é loja
6. Post 07 · Educação · IA não é robô sem graça
7. Post 08 · Prova · Antes x depois (Reel)
8. Post 09 · Dor · Pedido no caderno, pagamento no print

Ritmo recomendado: 2 a 3 publicações por semana.

## Regras de legibilidade aplicadas

- Capas usam background realista escuro, com overlay e coluna segura de texto.
- Elementos decorativos ficam com baixa opacidade quando se aproximam da copy.
- Chamadas principais ficam direto sobre a imagem, sem card pesado.
- Slides internos mantêm ilustrações no canto inferior direito e texto em área limpa.

## Gerar novamente

```bash
node --experimental-strip-types docs/instagram-carousel/posts-02-09/render-posts.mts
```

Ordem sugerida: alternar dor, educação e prova para manter variedade visual e narrativa na grade.
