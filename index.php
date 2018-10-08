<?php get_header(); ?>

	<main role="main">
        <div class="container">
            <div class="row">
            <!-- section -->
            <section class="col-12 pl-1 pr- pl-md-5 pr-md-5">
                <?php echo do_shortcode('[page_heading]');?>

                    <div class="cards row">
                        <?php echo do_shortcode('[body_content]');?>
                    </div>

            </section>
            </div>
        </div>
		<!-- /section -->
	</main>

<?php get_footer(); ?>
