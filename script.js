/* DOKUWIKI:include js/skip-link-focus-fix.js */

jQuery(document).ready(function() {
    /*
     * Click to toggle sidebar.
     */
    function toggleSidebar() {
        jQuery( '#writr__sidebar' ).on( 'click', '#writr__sidebar-toggle', function( e ) {
            e.preventDefault();
            jQuery( 'html, body' ).scrollTop( 0 );
            jQuery( this ).toggleClass( 'open' );
            jQuery( 'body' ).toggleClass( 'sidebar-closed' );
            jQuery( '#writr__secondary' ).resize();
        } );
    }

    /**
     * Handles toggling the navigation menu for small screens.
     */
    function toggleNavigation() {
        var $container = jQuery('#writr__site-navigation');
        if (!$container.length) return;
        var $button = jQuery('.menu-toggle', $container);
        if (!$button.length) return;
        var $menu = jQuery('ul', $container);
        if (!$menu.length) {
            $menu.hide();
            return;
        }
        $button.click(function(){
            $container.toggleClass('toggled');
        });
    }

    /*
     * A function to enable/disable a dropdown submenu.
     */
    function toggleSubmenu() {
        jQuery( '.main-navigation .node > div > a' ).append( '<span class="dropdown-icon" />' );
        jQuery( '#writr__site-navigation' ).on( 'click', '.dropdown-icon', function( e ) {
            e.preventDefault();
            jQuery( this ).toggleClass( 'open' );
            if ( jQuery( this ).hasClass( 'open' ) ) {
                jQuery( this ).parent().parent().next( 'ul' ).show();
            } else {
                jQuery( this ).parent().parent().next( 'ul' ).hide();
            }
        } );
    }

    /*
     * Close TOC by default
     */
    function closeToc() {
        var $toc = jQuery('#dw__toc .toggle');
        if($toc.length) {
            $toc[0].setState(-1);
        }
    }

    /*
     * Change search submit input to submit button to make it easier to style
     * @deprecated since Detritus
     */
    function changeSearchInput() {
        var $searchForm = jQuery('.search-form > form > div');
        var $searchButton = jQuery('input[type="submit"]', $searchForm).detach();
        var title = $searchButton.attr('title');
        var value = $searchButton.val();
        $searchForm.append('<button type="submit" title="'+title+'">'+value+'</button>');
    }

    /*
     * Enable add new page dropdown
     */
    function enableAddNewPage() {
        jQuery('.action.AddNewPage').click(function(event) {
            event.preventDefault();
            const button = jQuery(this);
            jQuery('.addnewpage').toggle(0,function(){
                // set aria-expanded attribute based on visibility
                button.attr('aria-expanded', jQuery(this).is(':visible'));
            });
        });

        jQuery(document).click(function(event) {
            if (!jQuery(event.target).closest('.action.AddNewPage, .addnewpage').length) {
                jQuery('.addnewpage').hide();
            }
        });
    }

    /*
     * Enable translation dropdown
     */
    function enableTranslation() {
        jQuery('.action.Translation').click(function(event) {
            event.preventDefault();
            const button = jQuery(this);
            jQuery('.plugin_translation').toggle(0,function(){
                // set aria-expanded attribute based on visibility
                button.attr('aria-expanded', jQuery(this).is(':visible'));
            });
        });

        jQuery(document).click(function(event) {
            if (!jQuery(event.target).closest('.action.Translation, .plugin_translation').length) {
                jQuery('.plugin_translation').hide();
            }
        });
    }

    /*
     * Enable Toolbar Dropdowns
     */
    function enableToolbarDropdowns() {
        jQuery('#writr__toolbar .hook .node').each(function() {
            const dropdown = jQuery(this);
            dropdown.find('div.li').click(function(event) {
                const trigger = jQuery(this);
                dropdown.find('> ul').toggle(0,function(){
                    trigger.attr('aria-expanded', jQuery(this).is(':visible'));
                });

                // Close dropdown when clicking outside
                jQuery(document).on('click.dropdown', function(e) {
                    if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
                        dropdown.find('> ul').hide();
                        trigger.attr('aria-expanded', 'false');
                        jQuery(document).off('click.dropdown');
                    }
                });
            });
        });
    }

    /*
     * Enable Collapse
     */
    function enableCollapse() {
        jQuery('[data-toggle="collapse"]').click(function(event){
            event.preventDefault();
            const trigger = jQuery(this);
            const target = jQuery(trigger.attr('data-target'));
            target.slideToggle('fast',function(){
                // set aria-expanded attribute based on visibility
                trigger.attr('aria-expanded', target.is(':visible'));
            });
        });
    }

    /*
     * Enable Dropdowns
     */
    function enableDropdowns() {
        jQuery('.dropdown').each(function() {
            const dropdown = jQuery(this);
            dropdown.find('[data-toggle="dropdown"]').click(function(event) {
                event.preventDefault();
                const button = jQuery(this);
                dropdown.find('.dropdown-menu').toggle(0,function(){
                    button.attr('aria-expanded', jQuery(this).is(':visible'));
                });

                // Close dropdown when clicking outside
                jQuery(document).on('click.dropdown', function(e) {
                    if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
                        dropdown.find('> ul').hide();
                        button.attr('aria-expanded', 'false');
                        jQuery(document).off('click.dropdown');
                    }
                });
            });
        });
    }

    /*
     * Enable Tooltips
     */
    function enableTooltips() {
        jQuery('body.enableTooltips [title]:not(.media):not(img):not([title=""]), body.enableTooltips [alt]:not(.media):not(img):not([alt=""])').each(function() {
            const element = jQuery(this);
            const content = element.attr('alt') ? element.attr('alt') : element.attr('title');
            element.attr('data-tooltip-content', content);

            element.hover(function() {
                // Prevent default browser tooltip from showing
                const tooltipType = element.attr('alt') ? 'alt' : 'title';
                element.removeAttr(tooltipType).attr('data-tooltip-type', tooltipType);

                // Create and append the tooltip
                const tooltip = jQuery('<div class="tooltip"><div class="tooltip-text">' + content + '</div></div>');
                jQuery('body').append(tooltip);

                // Calculate and set the position of the tooltip
                const elementOffset = element.offset();
                const tooltipWidth = tooltip.outerWidth();
                const elementWidth = element.outerWidth();
                const topPosition = elementOffset.top + element.outerHeight() + 10; // Adjust +10 for spacing
                const leftPosition = elementOffset.left + (elementWidth / 2) - (tooltipWidth / 2);

                tooltip.css({
                    top: topPosition,
                    left: leftPosition,
                    display: 'inline-block'
                });

            }, function() {
                // Restore the original attribute and remove the tooltip
                element.attr(element.attr('data-tooltip-type'), content);
                jQuery('.tooltip').remove();
            });
        });
    }

    /*
     * Enable Improved File Input
     */
    function enableFileInput() {
      jQuery('input[type="file"]').on('change', function() {
        var input = jQuery(this);
        var label = input.prev('span');
        var group = input.parent('label');
        var fileName = input.val().split('\\').pop() || 'No file chosen';

        // Check if a div already exists
        if (input.next('div').length > 0) {
            input.next('div').remove();
        }

        // Create a div after the input
        var file = jQuery('<div style="text-align:center;width:100%"></div>');

        // Update the text of the file-name span
        file.prepend(fileName);

        // Add a button to clear the field
        var button = jQuery('<button type="button" class="tagerror" style="margin-left:4px;padding: 4px 8px;font-size: 80%;"><i class="bi bi-trash"></i></button>').appendTo(file);

        // Add Click event on the button
        button.click(function(){

          // Clear value
          input.val('');

          // Remove the file object
          file.remove();

          // Show input and label
          label.show();
          input.show();
        });

        // Insert the div after the input
        input.after(file);

        // Hide label & input
        label.hide();
        input.hide();
      });
    }

    /*
     * Disable Newlines in Textareas
     */
    function disableNewlines() {
        // Check if "?do=" is present in the URL
        if (window.location.search.indexOf("?do=") === -1) {
            jQuery("form").on("submit", function(event) {
                // Prevent the form from submitting immediately
                event.preventDefault();

                // Find the textarea and replace newlines with " \\ "
                var textarea = jQuery(this).find('textarea');
                textarea.val(textarea.val().replace(/\n/gm, ' \\\\\\ '));

                // After running the function, manually trigger the form submission
                this.submit();
            });
        }
    }

    /*
     * Run the functions
     */
    jQuery(function(){
        toggleSidebar();
        toggleNavigation();
        toggleSubmenu();
        closeToc();
        changeSearchInput();
        enableAddNewPage();
        enableTranslation();
        enableToolbarDropdowns();
        enableDropdowns();
        enableTooltips();
        enableCollapse();
        enableFileInput();
    });

    /*
     * NSPAGES enable multi-line support
     */
    jQuery('.nspagesPicturesModeTitle').each(function() {
        if (jQuery(this).prop('scrollHeight') > 32) {
            jQuery(this).addClass('multi-line');
        }
    });

    /*
     * Disqus iframe minimum height
     *
     * Disqus sets an inline height with !important (via JS). That height can be a bit
     * too small for our visual caps/padding. We therefore enforce:
     *   effectiveHeight >= (disqusHeight + EXTRA)
     *
     * Important: we must NOT keep adding EXTRA on our own updates.
     */
    (function disqusMinHeightFix(){
        const $thread = jQuery('#disqus__thread');
        if (!$thread.length) return;

        const EXTRA = 72; // additional space needed for our visual caps/spacing

        function parseInlinePx(value) {
            if (!value) return null;
            const n = parseInt(String(value).replace('px', ''), 10);
            return Number.isFinite(n) ? n : null;
        }

        function getInlineHeightPx(iframe) {
            // Prefer inline style.height because Disqus writes it.
            const h = parseInlinePx(iframe.style && iframe.style.height);
            if (h !== null) return h;

            // Fallback: jQuery height
            const $if = jQuery(iframe);
            const jh = parseInlinePx($if.css('height'));
            return jh !== null ? jh : null;
        }

        function applyFloor(iframe) {
            if (!iframe) return;

            const current = getInlineHeightPx(iframe);
            if (current === null) return;

            // If this height is exactly what we last applied, ignore (prevents +64 runaway).
            const lastApplied = parseInlinePx(iframe.getAttribute('data-writr-last-applied'));
            if (lastApplied !== null && current === lastApplied) return;

            // Treat the current inline height as Disqus' desired height.
            const disqusHeight = current;
            const target = disqusHeight + EXTRA;

            // Only increase if needed.
            if (current < target) {
                iframe.style.setProperty('height', target + 'px', 'important');
                iframe.setAttribute('data-writr-last-applied', String(target));
            }

            // Keep a record of the last disqus height we saw.
            iframe.setAttribute('data-writr-last-disqus', String(disqusHeight));
        }

        function attachToIframe(iframe) {
            if (!iframe) return;

            // Avoid attaching twice.
            if (iframe.getAttribute('data-writr-disqus-observer') === '1') {
                applyFloor(iframe);
                return;
            }
            iframe.setAttribute('data-writr-disqus-observer', '1');

            // Initial apply.
            applyFloor(iframe);

            // Observe style changes (Disqus updates height via inline styles).
            const obs = new MutationObserver(function(mutations){
                for (const m of mutations) {
                    if (m.type === 'attributes' && m.attributeName === 'style') {
                        applyFloor(iframe);
                    }
                }
            });
            obs.observe(iframe, { attributes: true, attributeFilter: ['style'] });

            // Store observer so we can disconnect if needed.
            iframe._writrDisqusObs = obs;
        }

        function findPrimaryIframe() {
            // Disqus uses an iframe id like dsq-app####.
            const iframe = $thread.find('iframe[id^="dsq-app"]').get(0);
            return iframe || null;
        }

        // Attach to current iframe.
        attachToIframe(findPrimaryIframe());

        // In some cases Disqus replaces the iframe node. Watch the container for changes.
        const containerObs = new MutationObserver(function(){
            const iframe = findPrimaryIframe();
            if (iframe) attachToIframe(iframe);
        });
        containerObs.observe($thread.get(0), { childList: true, subtree: true });

        // As a last resort, re-apply on window resize (layout can change Disqus height).
        jQuery(window).on('resize', function(){
            const iframe = findPrimaryIframe();
            if (iframe) applyFloor(iframe);
        });
    })();
});
