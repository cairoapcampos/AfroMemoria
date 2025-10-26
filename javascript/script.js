// === CONFIGURAÇÃO INICIAL E FUNCIONALIDADES GLOBAIS ===

// Configuração do carousel
$(document).ready(function() {
    try {
        if ($('.carousel').length > 0) {
            $('.carousel').carousel({
                interval: 4000,
                pause: 'hover',
                keyboard: true
            });
            
            // Melhorar acessibilidade do carousel
            $('.carousel-control-prev, .carousel-control-next').attr('tabindex', '0');
        }
    } catch (error) {
        console.warn('Erro ao inicializar carousel:', error);
    }
});

// === FUNCIONALIDADES DA PÁGINA DE PERSONALIDADES ===
$(document).ready(function() {
    // Verifica se estamos na página de personalidades
    if ($('#personalitiesContainer').length > 0) {
        // Dados das personalidades com nome, ano de nascimento e categoria
        const personalidades = [
            { name: "Zumbi dos Palmares", birth: 1655, card: 0, category: "ativista" },
            { name: "Machado de Assis", birth: 1839, card: 1, category: "escritor" },
            { name: "André Rebouças", birth: 1838, card: 2, category: "academico" },
            { name: "Cruz e Sousa", birth: 1861, card: 3, category: "escritor" },
            { name: "Nilo Peçanha", birth: 1867, card: 4, category: "politico" },
            { name: "Lima Barreto", birth: 1881, card: 5, category: "escritor" },
            { name: "Pixinguinha", birth: 1897, card: 6, category: "musico" },
            { name: "Cartola", birth: 1908, card: 7, category: "musico" },
            { name: "Grande Otelo", birth: 1915, card: 8, category: "ator" },
            { name: "Milton Santos", birth: 1926, card: 9, category: "academico" },
            { name: "Bezerra da Silva", birth: 1927, card: 10, category: "musico" },
            { name: "Pelé", birth: 1940, card: 11, category: "esportista" },
            { name: "Glória Maria", birth: 1949, card: 12, category: "jornalista" },
            { name: "Benedita da Silva", birth: 1942, card: 13, category: "politico" },
            { name: "Gilberto Gil", birth: 1942, card: 14, category: "musico" },
            { name: "Milton Nascimento", birth: 1942, card: 15, category: "musico" },
            { name: "Tim Maia", birth: 1942, card: 16, category: "musico" },
            { name: "Djavan", birth: 1949, card: 17, category: "musico" },
            { name: "Marina Silva", birth: 1958, card: 18, category: "politico" },
            { name: "Seu Jorge", birth: 1970, card: 19, category: "musico" },
            { name: "Lázaro Ramos", birth: 1978, card: 20, category: "ator" },
            { name: "Taís Araújo", birth: 1979, card: 21, category: "ator" },
            { name: "Daiane dos Santos", birth: 1983, card: 22, category: "esportista" },
            { name: "Racionais MC's", birth: 1988, card: 23, category: "musico" }
        ];

        const container = $('#personalitiesContainer');
        const originalCards = container.children('.col-md-4').get();

        function filterAndSortPersonalities() {
            const sortType = $('#sortSelect').val();
            const categoryFilter = $('#categoryFilter').val();
            
            // Filtrar por categoria
            let filteredPersonalities = personalidades;
            if (categoryFilter !== 'all') {
                filteredPersonalities = personalidades.filter(p => p.category === categoryFilter);
            }
            
            // Ordenar
            let sortedPersonalities;
            if (sortType === 'alphabetical') {
                sortedPersonalities = [...filteredPersonalities].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            } else {
                sortedPersonalities = [...filteredPersonalities].sort((a, b) =>
                    a.birth - b.birth
                );
            }

            // Mapear para os cards correspondentes
            const sortedCards = sortedPersonalities.map(p => originalCards[p.card]);
            
            // Mostrar/ocultar cards
            $(originalCards).hide();
            container.empty().append(sortedCards);
            $(sortedCards).show();
            
            // Mostrar contador de resultados
            updateResultsCounter(sortedPersonalities.length, personalidades.length);
        }

        function updateResultsCounter(filtered, total) {
            // Remove contador anterior se existir
            $('.results-counter').remove();
            
            // Adiciona novo contador
            const counterText = filtered === total ? 
                `Mostrando todas as ${total} personalidades` : 
                `Mostrando ${filtered} de ${total} personalidades`;
            
            const counter = $(`<div class="results-counter text-center text-muted mb-3"><small>${counterText}</small></div>`);
            container.before(counter);
        }

        // Event listeners com tratamento de erro
        try {
            $('#sortSelect, #categoryFilter').change(filterAndSortPersonalities);
            
            // Adicionar suporte para teclado
            $('#sortSelect, #categoryFilter').on('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    $(this).trigger('change');
                }
            });
            
            // Inicializar contador
            updateResultsCounter(personalidades.length, personalidades.length);
        } catch (error) {
            console.error('Erro ao inicializar filtros de personalidades:', error);
        }
    }
});

// Funcionalidade de filtro dos sabores
$(document).ready(function() {
    // Verifica se estamos na página de sabores
    if ($('#saboresContainer').length > 0) {
        const container = $('#saboresContainer');
        const allCards = container.find('[data-category]');

        function filterSabores() {
            const categoryFilter = $('#categoryFilterSabores').val();
            
            if (categoryFilter === 'all') {
                allCards.show();
            } else {
                allCards.hide();
                container.find(`[data-category="${categoryFilter}"]`).show();
            }
            
            // Mostrar contador de resultados
            updateSaboresCounter();
        }

        function updateSaboresCounter() {
            const categoryFilter = $('#categoryFilterSabores').val();
            const total = allCards.length;
            let filtered;
            let counterText;
            
            if (categoryFilter === 'all') {
                filtered = total;
                counterText = `Mostrando todos os ${total} sabores`;
            } else {
                filtered = container.find(`[data-category="${categoryFilter}"]:visible`).length;
                const categoryNames = {
                    'doces': 'doces',
                    'salgados': 'pratos salgados', 
                    'bebidas': 'bebidas'
                };
                counterText = `Mostrando ${filtered} ${categoryNames[categoryFilter]} de ${total} sabores`;
            }
            
            // Remove contador anterior se existir
            $('.sabores-counter').remove();
            
            // Adiciona novo contador
            const counter = $(`<div class="sabores-counter text-center text-muted mb-3"><small>${counterText}</small></div>`);
            container.before(counter);
        }

        // Event listener com tratamento de erro
        try {
            $('#categoryFilterSabores').change(filterSabores);
            
            // Adicionar suporte para teclado
            $('#categoryFilterSabores').on('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    $(this).trigger('change');
                }
            });
            
            // Inicializar contador
            updateSaboresCounter();
        } catch (error) {
            console.error('Erro ao inicializar filtros de sabores:', error);
        }
    }
});

// === FUNCIONALIDADES FUTURAS RECOMENDADAS ===
/*
1. Adicionar debounce para buscas/filtros
2. Implementar lazy loading para imagens
3. Adicionar suporte para Service Workers (PWA)
4. Implementar analytics de uso
5. Adicionar funcionalidade de busca por texto
6. Implementar modo escuro/claro
7. Adicionar compartilhamento em redes sociais
*/

// === VALIDAÇÃO DO FORMULÁRIO DE CONTATO ===
$(document).ready(function() {
    // Verifica se estamos na página de contato
    if ($('#submitBtn').length > 0) {
        const form = $('form[role="form"]');
        
        // Validação em tempo real
        form.find('input, select, textarea').on('blur', function() {
            validateField($(this));
        });
        
        // Submissão do formulário
        form.on('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            form.find('input[required], select[required], textarea[required]').each(function() {
                if (!validateField($(this))) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                submitForm();
            } else {
                // Focar no primeiro campo inválido
                form.find('.is-invalid').first().focus();
            }
        });
        
        function validateField($field) {
            const value = $field.val().trim();
            const fieldType = $field.attr('type') || $field.prop('tagName').toLowerCase();
            let isValid = true;
            
            // Remover classes anteriores
            $field.removeClass('is-valid is-invalid');
            
            // Verificar campos obrigatórios
            if ($field.prop('required') && !value) {
                isValid = false;
            }
            
            // Validações específicas
            if (value && fieldType === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
            }
            
            // Aplicar classes de validação
            $field.addClass(isValid ? 'is-valid' : 'is-invalid');
            
            return isValid;
        }
        
        function submitForm() {
            const $submitBtn = $('#submitBtn');
            const $submitText = $submitBtn.find('.submit-text');
            const $spinner = $submitBtn.find('.spinner-border');
            
            // Mostrar loading
            $submitBtn.prop('disabled', true);
            $submitText.text('Enviando...');
            $spinner.removeClass('d-none');
            
            // Simular envio (substituir por implementação real)
            setTimeout(function() {
                $submitBtn.prop('disabled', false);
                $submitText.text('Enviar Mensagem');
                $spinner.addClass('d-none');
                
                // Mostrar mensagem de sucesso
                showNotification('Mensagem enviada com sucesso!', 'success');
                form[0].reset();
                form.find('.is-valid').removeClass('is-valid');
            }, 2000);
        }
        
        function showNotification(message, type) {
            const notification = $(`
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `);
            
            form.before(notification);
            
            // Remover após 5 segundos
            setTimeout(() => {
                notification.fadeOut(() => notification.remove());
            }, 5000);
        }
    }
});
