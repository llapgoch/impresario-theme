<?php get_header(); ?>
    <div id="content" class="col-md-12">
        <main role="main" class="main-container">
            <?php get_sidebar(); ?>
            <!-- section -->
            <div class="main-content-container">
                <section>


                <?php if (have_posts()): while (have_posts()) : the_post(); ?>

                    <!-- article -->
                    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

                        <?php the_content(); ?>

                        <?php comments_template( '', true ); // Remove if you don't want comments ?>

                        <br class="clear">

                        <?php edit_post_link(); ?>

                    </article>
                    <!-- /article -->

                <?php endwhile; ?>

                <?php else: ?>

                    <!-- article -->
                    <article>

                        <h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>

                    </article>
                    <!-- /article -->

                <?php endif; ?>

                </section>
            </div>
            <!-- /section -->
        </main>
    </div>


<?php get_footer(); ?>
